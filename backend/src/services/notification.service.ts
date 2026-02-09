/**
 * Notification Service - Email/SMS for transaction updates.
 * Production: integrate SendGrid, AWS SES, Twilio.
 */

export function notifyTransactionUpdate(transactionId: string, status: string): void {
  if (process.env.NODE_ENV !== 'test') {
    console.info('[NOTIFY]', { transactionId, status, at: new Date().toISOString() })
  }
  // TODO: Load user email/phone, send via SendGrid/Twilio
}

export function sendVerificationEmail(_email: string, _token: string): void {
  // TODO: SendGrid/SES
}

export function sendSms(_phone: string, _message: string): void {
  // TODO: Twilio
}
