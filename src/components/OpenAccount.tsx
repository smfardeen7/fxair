import { useState } from 'react'

const STEPS = [
  { id: 1, label: 'Personal Details', short: 'Personal' },
  { id: 2, label: 'Verification', short: 'Verification' },
  { id: 3, label: 'Financial & Preferences', short: 'Financial' },
  { id: 4, label: 'Review & Submit', short: 'Review' },
]

const EMPLOYMENT_OPTIONS = ['Employed', 'Self-Employed', 'Student', 'Retired', 'Unemployed']
const SOURCE_OF_FUNDS = ['Salary', 'Business Income', 'Savings', 'Inheritance', 'Investments', 'Other']
const INCOME_RANGES = ['Under $25,000', '$25,000 - $50,000', '$50,000 - $100,000', '$100,000 - $250,000', '$250,000+']
const ID_TYPES = ['Passport', "Driver's License", 'National ID']
const BASE_CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'Other']
const ACCOUNT_TYPES = ['Individual', 'Business']
const PURPOSE_OPTIONS = ['Personal Remittance', 'Business Payments', 'Family Support', 'Investment', 'Other']

type FormData = {
  // Step 1
  fullName: string
  dateOfBirth: string
  nationality: string
  countryOfResidence: string
  phone: string
  email: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  // Step 2
  idType: string
  idNumber: string
  idExpiry: string
  proofOfAddressNote: string
  // Step 3
  employmentStatus: string
  occupation: string
  annualIncome: string
  sourceOfFunds: string
  monthlyVolume: string
  baseCurrency: string
  preferredCorridors: string
  accountType: string
  taxResidency: string
  tin: string
  usPerson: string
  pep: string
  purpose: string
  // Step 4 - login credentials (for easy sign-in after signup)
  username: string
  password: string
  referralCode: string
  terms: boolean
  privacy: boolean
  aml: boolean
  electronicConsent: boolean
  dataProcessing: boolean
}

const defaultFormData: FormData = {
  fullName: '',
  dateOfBirth: '',
  nationality: '',
  countryOfResidence: '',
  phone: '',
  email: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  idType: '',
  idNumber: '',
  idExpiry: '',
  proofOfAddressNote: '',
  employmentStatus: '',
  occupation: '',
  annualIncome: '',
  sourceOfFunds: '',
  monthlyVolume: '',
  baseCurrency: 'USD',
  preferredCorridors: '',
  accountType: 'Individual',
  taxResidency: '',
  tin: '',
  usPerson: '',
  pep: '',
  purpose: '',
  username: '',
  password: '',
  referralCode: '',
  terms: false,
  privacy: false,
  aml: false,
  electronicConsent: false,
  dataProcessing: false,
}

function generateReference() {
  return 'FX' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 8).toUpperCase()
}

export default function OpenAccount() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [submitted, setSubmitted] = useState(false)
  const [reference, setReference] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (key: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key as string]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {}
    if (s === 1) {
      if (!formData.fullName.trim()) e.fullName = 'Required'
      if (!formData.dateOfBirth) e.dateOfBirth = 'Required'
      if (!formData.nationality.trim()) e.nationality = 'Required'
      if (!formData.countryOfResidence.trim()) e.countryOfResidence = 'Required'
      if (!formData.phone.trim()) e.phone = 'Required'
      if (!formData.email.trim()) e.email = 'Required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email'
      if (!formData.street.trim()) e.street = 'Required'
      if (!formData.city.trim()) e.city = 'Required'
      if (!formData.postalCode.trim()) e.postalCode = 'Required'
      if (!formData.country.trim()) e.country = 'Required'
    }
    if (s === 2) {
      if (!formData.idType) e.idType = 'Required'
      if (!formData.idNumber.trim()) e.idNumber = 'Required'
      if (!formData.idExpiry) e.idExpiry = 'Required'
    }
    if (s === 4) {
      if (!formData.username.trim()) e.username = 'Required'
      else if (formData.username.length < 3) e.username = 'At least 3 characters'
      else if (formData.username.length > 32) e.username = 'Max 32 characters'
      else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) e.username = 'Letters, numbers and underscore only'
      if (!formData.password) e.password = 'Required'
      else if (formData.password.length < 8) e.password = 'At least 8 characters'
      if (!formData.terms) e.terms = 'You must accept Terms & Conditions'
      if (!formData.privacy) e.privacy = 'You must accept Privacy Policy'
      if (!formData.aml) e.aml = 'You must accept AML Policy'
      if (!formData.electronicConsent) e.electronicConsent = 'Required'
      if (!formData.dataProcessing) e.dataProcessing = 'Required for data processing'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step < 4 && validateStep(step)) setStep((s) => s + 1)
  }
  const prev = () => setStep((s) => Math.max(1, s - 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step !== 4 || !validateStep(4)) return
    setReference(generateReference())
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="py-20 lg:py-28 bg-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fxair-purple/20 text-fxair-purple-light mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-2">Thank you!</h2>
          <p className="text-gray-400 mb-6">Your application is under review.</p>
          <p className="text-sm text-gray-500 mb-2">Reference / Application number</p>
          <p className="font-mono text-xl font-semibold text-fxair-purple-light mb-8">{reference}</p>
          <div className="bg-gray-900/50 rounded-xl p-6 text-left border border-gray-800">
            <h3 className="font-semibold text-white mb-3">What happens next</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• You will receive a welcome email with next steps within a few minutes.</li>
              <li>• We will verify your documents—usually within 24–48 hours.</li>
              <li>• If we need anything else, we will email you with a checklist.</li>
              <li>• Once approved, you can link your bank and start transferring.</li>
            </ul>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Questions? Contact us at <a href="mailto:support@fxair.com" className="text-fxair-purple-light hover:underline">support@fxair.com</a>.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Open an account</h2>
          <p className="text-gray-400 mb-4">
            Account opening takes about 5–7 minutes. Have your ID and proof of address ready.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Bank-level 256-bit SSL encryption
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Regulated & compliant
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Your data is never shared with third parties
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div
                className={`flex flex-col items-center ${step >= s.id ? 'text-fxair-purple-light' : 'text-gray-600'}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                    step > s.id
                      ? 'bg-fxair-purple border-fxair-purple text-white'
                      : step === s.id
                        ? 'border-fxair-purple-light text-fxair-purple-light'
                        : 'border-gray-600 text-gray-500'
                  }`}
                >
                  {step > s.id ? '✓' : s.id}
                </div>
                <span className="mt-1.5 text-xs font-medium hidden sm:block">{s.short}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 ${step > s.id ? 'bg-fxair-purple' : 'bg-gray-700'}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Personal */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Personal information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full legal name (as per government ID)</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="As on passport or ID"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date of birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => update('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-400">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => update('nationality', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="e.g. Indian, British"
                  />
                  {errors.nationality && <p className="mt-1 text-sm text-red-400">{errors.nationality}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Country of residence</label>
                  <input
                    type="text"
                    value={formData.countryOfResidence}
                    onChange={(e) => update('countryOfResidence', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="e.g. United Kingdom"
                  />
                  {errors.countryOfResidence && <p className="mt-1 text-sm text-red-400">{errors.countryOfResidence}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone (with country code)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="+44 7700 900000"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>
              </div>
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Residential address</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => update('street', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="Street"
                  />
                  {errors.street && <p className="mt-1 text-sm text-red-400">{errors.street}</p>}
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => update('city', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                        placeholder="City"
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-400">{errors.city}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => update('state', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                        placeholder="State / Province"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => update('postalCode', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                        placeholder="Postal code"
                      />
                      {errors.postalCode && <p className="mt-1 text-sm text-red-400">{errors.postalCode}</p>}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => update('country', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="Country"
                  />
                  {errors.country && <p className="mt-1 text-sm text-red-400">{errors.country}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Verification */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Identity verification (KYC/AML)</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">ID type</label>
                  <select
                    value={formData.idType}
                    onChange={(e) => update('idType', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  >
                    <option value="">Select</option>
                    {ID_TYPES.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.idType && <p className="mt-1 text-sm text-red-400">{errors.idType}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">ID number</label>
                  <input
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) => update('idNumber', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="Document number"
                  />
                  {errors.idNumber && <p className="mt-1 text-sm text-red-400">{errors.idNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">ID expiration date</label>
                  <input
                    type="date"
                    value={formData.idExpiry}
                    onChange={(e) => update('idExpiry', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  />
                  {errors.idExpiry && <p className="mt-1 text-sm text-red-400">{errors.idExpiry}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Upload ID document (front & back)</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center text-gray-500 text-sm">
                  Drag and drop or click to upload. Accepted: PDF, JPG, PNG (max 10MB).
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Proof of address (utility bill or bank statement, within 3 months)</label>
                <input
                  type="text"
                  value={formData.proofOfAddressNote}
                  onChange={(e) => update('proofOfAddressNote', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  placeholder="Note or upload in next step"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Selfie / live photo verification</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center text-gray-500 text-sm">
                  You will be asked to take a selfie during verification.
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Financial & Preferences */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Financial information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Employment status</label>
                  <select
                    value={formData.employmentStatus}
                    onChange={(e) => update('employmentStatus', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  >
                    <option value="">Select</option>
                    {EMPLOYMENT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Occupation / industry</label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => update('occupation', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Annual income range</label>
                  <select
                    value={formData.annualIncome}
                    onChange={(e) => update('annualIncome', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  >
                    <option value="">Select</option>
                    {INCOME_RANGES.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Source of funds</label>
                  <select
                    value={formData.sourceOfFunds}
                    onChange={(e) => update('sourceOfFunds', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  >
                    <option value="">Select</option>
                    {SOURCE_OF_FUNDS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Estimated monthly transfer volume</label>
                  <input
                    type="text"
                    value={formData.monthlyVolume}
                    onChange={(e) => update('monthlyVolume', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="e.g. $1,000 - $5,000"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2 pt-2">Account preferences</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Base currency</label>
                  <select
                    value={formData.baseCurrency}
                    onChange={(e) => update('baseCurrency', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  >
                    {BASE_CURRENCIES.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Account type</label>
                  <select
                    value={formData.accountType}
                    onChange={(e) => update('accountType', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  >
                    {ACCOUNT_TYPES.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Preferred transfer corridors</label>
                  <input
                    type="text"
                    value={formData.preferredCorridors}
                    onChange={(e) => update('preferredCorridors', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="e.g. USA → India, UK → Philippines"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2 pt-2">Regulatory & compliance</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tax residency country</label>
                  <input
                    type="text"
                    value={formData.taxResidency}
                    onChange={(e) => update('taxResidency', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="e.g. United Kingdom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tax ID (TIN / SSN)</label>
                  <input
                    type="text"
                    value={formData.tin}
                    onChange={(e) => update('tin', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                    placeholder="Optional for some jurisdictions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Are you a US person? (FATCA)</label>
                  <select
                    value={formData.usPerson}
                    onChange={(e) => update('usPerson', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Politically exposed person (PEP)?</label>
                  <select
                    value={formData.pep}
                    onChange={(e) => update('pep', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Purpose of account</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => update('purpose', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  >
                    <option value="">Select</option>
                    {PURPOSE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Create your login</h3>
              <p className="text-sm text-gray-400">Use your username and password to sign in anytime.</p>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => update('username', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  placeholder="Letters, numbers, underscore only"
                  autoComplete="username"
                />
                <p className="mt-1 text-xs text-gray-500">3–32 characters. You’ll use this to log in.</p>
                {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password (min 8 characters)</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => update('password', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  placeholder="Strong password"
                  autoComplete="new-password"
                />
                <p className="mt-1 text-xs text-gray-500">We recommend 2FA (SMS or authenticator app) after signup.</p>
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>

              <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2 pt-2">Legal</h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Referral code (optional)</label>
                <input
                  type="text"
                  value={formData.referralCode}
                  onChange={(e) => update('referralCode', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-fxair-purple focus:ring-1 focus:ring-fxair-purple"
                  placeholder="Have a referral code? Enter it here"
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) => update('terms', e.target.checked)}
                    className="mt-1 rounded border-gray-600 bg-gray-900 text-fxair-purple focus:ring-fxair-purple"
                  />
                  <span className="text-sm text-gray-300">I accept the <a href="#terms" className="text-fxair-purple-light hover:underline">Terms & Conditions</a></span>
                </label>
                {errors.terms && <p className="text-sm text-red-400">{errors.terms}</p>}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacy}
                    onChange={(e) => update('privacy', e.target.checked)}
                    className="mt-1 rounded border-gray-600 bg-gray-900 text-fxair-purple focus:ring-fxair-purple"
                  />
                  <span className="text-sm text-gray-300">I accept the <a href="#privacy" className="text-fxair-purple-light hover:underline">Privacy Policy</a></span>
                </label>
                {errors.privacy && <p className="text-sm text-red-400">{errors.privacy}</p>}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.aml}
                    onChange={(e) => update('aml', e.target.checked)}
                    className="mt-1 rounded border-gray-600 bg-gray-900 text-fxair-purple focus:ring-fxair-purple"
                  />
                  <span className="text-sm text-gray-300">I accept the Anti-Money Laundering (AML) Policy</span>
                </label>
                {errors.aml && <p className="text-sm text-red-400">{errors.aml}</p>}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.electronicConsent}
                    onChange={(e) => update('electronicConsent', e.target.checked)}
                    className="mt-1 rounded border-gray-600 bg-gray-900 text-fxair-purple focus:ring-fxair-purple"
                  />
                  <span className="text-sm text-gray-300">I consent to electronic communications</span>
                </label>
                {errors.electronicConsent && <p className="text-sm text-red-400">{errors.electronicConsent}</p>}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dataProcessing}
                    onChange={(e) => update('dataProcessing', e.target.checked)}
                    className="mt-1 rounded border-gray-600 bg-gray-900 text-fxair-purple focus:ring-fxair-purple"
                  />
                  <span className="text-sm text-gray-300">I consent to data processing (e.g. GDPR where applicable)</span>
                </label>
                {errors.dataProcessing && <p className="text-sm text-red-400">{errors.dataProcessing}</p>}
              </div>

              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 text-sm text-gray-400">
                <p className="font-medium text-white mb-1">Summary</p>
                <p><span className="text-gray-500">Name:</span> {formData.fullName || '—'}</p>
                <p><span className="text-gray-500">Username:</span> {formData.username || '—'}</p>
                <p><span className="text-gray-500">Email:</span> {formData.email || '—'}</p>
                <p><span className="text-gray-500">Account type:</span> {formData.accountType || '—'}</p>
                <p><span className="text-gray-500">Base currency:</span> {formData.baseCurrency || '—'}</p>
              </div>

              <p className="text-xs text-gray-500">
                Your account will be verified within 24–48 hours. You will receive email confirmation once approved.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prev}
                className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Back
              </button>
            )}
            <div className="flex-1" />
            {step < 4 ? (
              <button
                type="button"
                onClick={next}
                className="px-6 py-2.5 rounded-lg bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-fxair-purple text-white font-semibold hover:bg-fxair-purple-light transition-colors"
              >
                Submit application
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
