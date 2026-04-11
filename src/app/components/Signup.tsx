import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Building2, User, Check, Globe, Mail, Briefcase, Target } from 'lucide-react';
import logoImage from 'figma:asset/3652bbb3d862ef5d1f8e73f682be9a5d17342ca4.png';

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Consulting',
  'Marketing',
  'Real Estate',
  'Other'
];

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
];

const PERSONALITY_TRAITS = [
  'Needs constant direction',
  'Avoids conflict',
  'Overly analytical',
  'Risk-averse',
  'Highly dominant',
  'Emotionally reactive'
];

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'account' | 'profile' | 'onboarding'>('account');

  // Account fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Profile fields - Step 2
  const [employerName, setEmployerName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [pointOfContact, setPointOfContact] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');

  // Onboarding fields - Step 3
  const [operatingStyle, setOperatingStyle] = useState('');
  const [speedQualityTradeoff, setSpeedQualityTradeoff] = useState('');
  const [ownershipExpectation, setOwnershipExpectation] = useState('');
  const [decisionMaking, setDecisionMaking] = useState('');
  const [communicationCulture, setCommunicationCulture] = useState('');
  const [personalityMismatch, setPersonalityMismatch] = useState<string[]>([]);
  const [highPerformerDefinition, setHighPerformerDefinition] = useState('');
  const [missionVision, setMissionVision] = useState('');

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (step === 'account') return 33;
    if (step === 'profile') return 66;
    return 100;
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setStep('profile');
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('onboarding');
  };

  const togglePersonalityMismatch = (trait: string) => {
    setPersonalityMismatch(prev => {
      if (prev.includes(trait)) {
        return prev.filter(t => t !== trait);
      }
      if (prev.length < 2) {
        return [...prev, trait];
      }
      return prev;
    });
  };

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save all data to context/backend
    // For now, navigate to dashboard
    navigate('/');
  };

  const wordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-2xl space-y-8 py-8">
          {/* Logo */}
          <div>
            <img src={logoImage} alt="ReXruiters" className="h-16 w-auto mb-8" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {step === 'account' && 'Create Your Account'}
              {step === 'profile' && 'Complete Your Profile'}
              {step === 'onboarding' && 'Company Culture & Preferences'}
            </h1>
            <p className="text-gray-600">
              {step === 'account' && 'Join ReXruiters and start hiring smarter'}
              {step === 'profile' && 'Tell us about yourself and your company'}
              {step === 'onboarding' && 'Help us understand your company culture'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'account' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                }`}>
                  {step !== 'account' ? <Check className="w-5 h-5" /> : '1'}
                </div>
                <span className={step === 'account' ? 'font-semibold text-gray-900' : 'text-gray-600'}>
                  Account
                </span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'profile' ? 'bg-red-600 text-white' : 
                  step === 'onboarding' ? 'bg-green-600 text-white' : 
                  'bg-gray-200 text-gray-600'
                }`}>
                  {step === 'onboarding' ? <Check className="w-5 h-5" /> : '2'}
                </div>
                <span className={step === 'profile' ? 'font-semibold text-gray-900' : 'text-gray-600'}>
                  Profile
                </span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'onboarding' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
                <span className={step === 'onboarding' ? 'font-semibold text-gray-900' : 'text-gray-600'}>
                  Onboarding
                </span>
              </div>
            </div>
          </div>

          {/* Account Creation Form */}
          {step === 'account' && (
            <form onSubmit={handleAccountSubmit} className="space-y-6">
              <Card className="border-2">
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Work Email Address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12"
                      required
                      minLength={8}
                    />
                    <p className="text-xs text-gray-500">At least 8 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-base font-semibold"
              >
                Continue to Profile
              </Button>

              <div className="text-center">
                <span className="text-gray-600">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  Login
                </button>
              </div>
            </form>
          )}

          {/* Profile Form - Step 2 */}
          {step === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-red-600" />
                    Employer Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employer-name">Employer Name *</Label>
                    <Input
                      id="employer-name"
                      placeholder="John Doe"
                      value={employerName}
                      onChange={(e) => setEmployerName(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-website">Company Website *</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <Input
                        id="company-website"
                        type="url"
                        placeholder="https://www.company.com"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        className="h-12 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="point-of-contact">Point of Contact *</Label>
                    <Input
                      id="point-of-contact"
                      placeholder="Primary contact person name"
                      value={pointOfContact}
                      onChange={(e) => setPointOfContact(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email ID *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="contact@company.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="h-12 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title *</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <Input
                        id="job-title"
                        placeholder="HR Manager, CEO, Founder, etc."
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="h-12 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-size">Company Size *</Label>
                      <Select value={companySize} onValueChange={setCompanySize} required>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPANY_SIZES.map(size => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-industry">Company Industry *</Label>
                      <Select value={companyIndustry} onValueChange={setCompanyIndustry} required>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map(ind => (
                            <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('account')}
                  className="flex-1 h-12 border-2"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-base font-semibold"
                >
                  Continue to Onboarding
                </Button>
              </div>
            </form>
          )}

          {/* Onboarding Form - Step 3 */}
          {step === 'onboarding' && (
            <form onSubmit={handleOnboardingSubmit} className="space-y-6">
              {/* Company Operating Style */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-red-600" />
                    Company Operating Style
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Your company currently feels more like:</p>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={operatingStyle} onValueChange={setOperatingStyle} required>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="chaotic" id="chaotic" />
                        <Label htmlFor="chaotic" className="cursor-pointer flex-1">Chaotic & fast-moving</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="agile" id="agile" />
                        <Label htmlFor="agile" className="cursor-pointer flex-1">Structured but agile</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="organized" id="organized" />
                        <Label htmlFor="organized" className="cursor-pointer flex-1">Process-heavy & organized</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="hierarchical" id="hierarchical" />
                        <Label htmlFor="hierarchical" className="cursor-pointer flex-1">Corporate & hierarchical</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Speed vs Quality Trade-off */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Speed vs Quality Trade-off</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">When deadlines are tight, you prioritize:</p>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={speedQualityTradeoff} onValueChange={setSpeedQualityTradeoff} required>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="speed" id="speed" />
                        <Label htmlFor="speed" className="cursor-pointer flex-1">Shipping fast, iterate later</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="balanced" id="balanced" />
                        <Label htmlFor="balanced" className="cursor-pointer flex-1">Balanced approach</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="precision" id="precision" />
                        <Label htmlFor="precision" className="cursor-pointer flex-1">High precision, minimal errors</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Ownership Expectation */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Ownership Expectation</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">You expect team members to:</p>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={ownershipExpectation} onValueChange={setOwnershipExpectation} required>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="execute" id="execute" />
                        <Label htmlFor="execute" className="cursor-pointer flex-1">Execute assigned tasks</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="manage" id="manage" />
                        <Label htmlFor="manage" className="cursor-pointer flex-1">Manage projects independently</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="own" id="own" />
                        <Label htmlFor="own" className="cursor-pointer flex-1">Own outcomes without supervision</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Decision-Making Style */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Decision-Making Style</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Most decisions in your company are:</p>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={decisionMaking} onValueChange={setDecisionMaking} required>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="founder-led" id="founder-led" />
                        <Label htmlFor="founder-led" className="cursor-pointer flex-1">Founder-led</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="manager-led" id="manager-led" />
                        <Label htmlFor="manager-led" className="cursor-pointer flex-1">Manager-led</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="consensus" id="consensus" />
                        <Label htmlFor="consensus" className="cursor-pointer flex-1">Consensus-based</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="data-driven" id="data-driven" />
                        <Label htmlFor="data-driven" className="cursor-pointer flex-1">Data-driven</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Communication Culture */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Communication Culture</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Communication in your team is:</p>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={communicationCulture} onValueChange={setCommunicationCulture} required>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="blunt" id="blunt" />
                        <Label htmlFor="blunt" className="cursor-pointer flex-1">Very direct & blunt</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="direct-respectful" id="direct-respectful" />
                        <Label htmlFor="direct-respectful" className="cursor-pointer flex-1">Direct but respectful</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="diplomatic" id="diplomatic" />
                        <Label htmlFor="diplomatic" className="cursor-pointer flex-1">Diplomatic & cautious</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Personality Mismatch */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Personality Mismatch</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Select up to 2 traits that usually struggle in your culture:</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {PERSONALITY_TRAITS.map(trait => (
                      <div key={trait} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <Checkbox
                          id={trait}
                          checked={personalityMismatch.includes(trait)}
                          onCheckedChange={() => togglePersonalityMismatch(trait)}
                          disabled={!personalityMismatch.includes(trait) && personalityMismatch.length >= 2}
                        />
                        <Label 
                          htmlFor={trait} 
                          className="cursor-pointer flex-1"
                        >
                          {trait}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    {personalityMismatch.length}/2 selected
                  </p>
                </CardContent>
              </Card>

              {/* High Performer Definition */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-600" />
                    High Performer Definition
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">In one or two sentences: What makes someone exceptional in your company?</p>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe what makes a high performer at your company..."
                    value={highPerformerDefinition}
                    onChange={(e) => setHighPerformerDefinition(e.target.value)}
                    className="min-h-[100px] resize-none"
                    required
                  />
                  <p className={`text-xs mt-2 ${wordCount(highPerformerDefinition) > 150 ? 'text-red-600' : 'text-gray-500'}`}>
                    {wordCount(highPerformerDefinition)}/150 words
                  </p>
                </CardContent>
              </Card>

              {/* Mission and Vision */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Company Mission and Vision</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Explain your company's mission and vision:</p>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Share your company's mission and vision..."
                    value={missionVision}
                    onChange={(e) => setMissionVision(e.target.value)}
                    className="min-h-[100px] resize-none"
                    required
                  />
                  <p className={`text-xs mt-2 ${wordCount(missionVision) > 150 ? 'text-red-600' : 'text-gray-500'}`}>
                    {wordCount(missionVision)}/150 words
                  </p>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('profile')}
                  className="flex-1 h-12 border-2"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-base font-semibold"
                  disabled={wordCount(highPerformerDefinition) > 150 || wordCount(missionVision) > 150}
                >
                  Complete Setup & Go to Dashboard
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-red-500 to-red-700">
        <img
          src="https://images.unsplash.com/photo-1676276374429-3902f2666824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBjb2xsYWJvcmF0aW9uJTIwb2ZmaWNlJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc3MDYzNjEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="ReXruiters Platform"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center space-y-6">
            <h2 className="text-5xl font-bold">
              {step === 'account' && (<>Join Thousands of <br />Successful Employers</>)}
              {step === 'profile' && (<>Build Your Dream <br />Team Today</>)}
              {step === 'onboarding' && (<>Find Perfect <br />Culture Fits</>)}
            </h2>
            <p className="text-xl text-red-100 max-w-lg mx-auto">
              {step === 'account' && 'Create up to 3 active jobs, assess candidates with AI-powered tools, and make data-driven hiring decisions.'}
              {step === 'profile' && 'Set up your company profile and start posting jobs in minutes. Get access to quality candidates instantly.'}
              {step === 'onboarding' && 'Our AI matches candidates not just by skills, but by cultural fit and work style preferences.'}
            </p>
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-xl mx-auto">
              <div>
                <div className="text-4xl font-bold mb-2">3</div>
                <div className="text-red-100 text-sm">Active Jobs</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">AI</div>
                <div className="text-red-100 text-sm">Powered</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Fast</div>
                <div className="text-red-100 text-sm">Hiring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
