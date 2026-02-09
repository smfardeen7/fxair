-- FXAir Backend - PostgreSQL Schema
-- Run against your database: psql $DATABASE_URL -f schema.sql

-- Users (identity + KYC status)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(64) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  country VARCHAR(2),
  kyc_status VARCHAR(20) DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Bank connections (linked accounts; tokenized in production)
CREATE TABLE IF NOT EXISTS bank_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bank_name VARCHAR(100) NOT NULL,
  account_number_encrypted TEXT,
  account_last_four VARCHAR(4) NOT NULL,
  routing_number VARCHAR(50),
  account_holder_name VARCHAR(100) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  country VARCHAR(2) NOT NULL,
  verified BOOLEAN DEFAULT false,
  plaid_access_token TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bank_connections_user ON bank_connections(user_id);

-- Transactions (transfer state machine)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  source_bank_id UUID NOT NULL REFERENCES bank_connections(id),
  destination_bank_id UUID NOT NULL REFERENCES bank_connections(id),
  source_amount DECIMAL(19, 4) NOT NULL,
  source_currency VARCHAR(3) NOT NULL,
  destination_amount DECIMAL(19, 4) NOT NULL,
  destination_currency VARCHAR(3) NOT NULL,
  exchange_rate DECIMAL(18, 8) NOT NULL,
  fee_amount DECIMAL(19, 4) NOT NULL,
  fee_percentage DECIMAL(5, 2) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'initiated' CHECK (status IN (
    'initiated', 'bank_verification', 'processing', 'completed', 'failed'
  )),
  external_reference VARCHAR(255),
  estimated_completion_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created ON transactions(created_at DESC);

-- Exchange rates (cache; real-time from FX API)
CREATE TABLE IF NOT EXISTS exchange_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_currency VARCHAR(3) NOT NULL,
  to_currency VARCHAR(3) NOT NULL,
  rate DECIMAL(18, 8) NOT NULL,
  margin DECIMAL(8, 6) DEFAULT 0,
  source VARCHAR(50),
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_currency, to_currency)
);

CREATE INDEX idx_exchange_rates_pair ON exchange_rates(from_currency, to_currency);

-- Compliance / AML (sanctions screening, PEP, etc.)
CREATE TABLE IF NOT EXISTS compliance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  record_type VARCHAR(50) NOT NULL,
  provider VARCHAR(50),
  result VARCHAR(20),
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_compliance_user ON compliance_records(user_id);

-- Audit log (immutable trail for regulators)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);

-- Ledger (double-entry for financial accuracy)
CREATE TABLE IF NOT EXISTS ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID REFERENCES transactions(id),
  account_type VARCHAR(50) NOT NULL,
  account_id UUID NOT NULL,
  amount DECIMAL(19, 4) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  side VARCHAR(10) NOT NULL CHECK (side IN ('debit', 'credit')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ledger_transaction ON ledger_entries(transaction_id);
CREATE INDEX idx_ledger_created ON ledger_entries(created_at DESC);
