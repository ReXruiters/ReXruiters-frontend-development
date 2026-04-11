import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Separator } from '@/app/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { Bell, Lock, Users, CreditCard, Palette, Mail, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    newApplications: true,
    assessmentCompleted: true,
    weeklyReport: false,
    marketingEmails: false
  });

  const [privacy, setPrivacy] = useState({
    showCompanyProfile: true,
    allowSearchEngines: true,
    twoFactorAuth: false
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-red-600" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Theme</p>
                      <p className="text-sm text-gray-600">Choose your preferred theme</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Light</Button>
                      <Button variant="ghost" size="sm">Dark</Button>
                      <Button variant="ghost" size="sm">Auto</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Language</p>
                      <p className="text-sm text-gray-600">Select your preferred language</p>
                    </div>
                    <Button variant="outline">English (US)</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    Email Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primaryEmail">Primary Email</Label>
                    <Input
                      id="primaryEmail"
                      type="email"
                      defaultValue="admin@acme.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="replyTo">Reply-to Email (for candidates)</Label>
                    <Input
                      id="replyTo"
                      type="email"
                      defaultValue="careers@acme.com"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-red-600" />
                  Notification Preferences
                </CardTitle>
                <p className="text-sm text-gray-600">Choose what updates you want to receive</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">New Applications</p>
                    <p className="text-sm text-gray-600">Get notified when someone applies to your jobs</p>
                  </div>
                  <Switch
                    checked={notifications.newApplications}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, newApplications: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Assessment Completed</p>
                    <p className="text-sm text-gray-600">Notify when a candidate completes their assessment</p>
                  </div>
                  <Switch
                    checked={notifications.assessmentCompleted}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, assessmentCompleted: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Weekly Reports</p>
                    <p className="text-sm text-gray-600">Receive weekly summary of your hiring activity</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, weeklyReport: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Marketing Emails</p>
                    <p className="text-sm text-gray-600">Tips, news, and product updates from ReXruiters</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, marketingEmails: checked }))
                    }
                  />
                </div>

                <div className="pt-4">
                  <Button onClick={handleSave}>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={privacy.twoFactorAuth}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, twoFactorAuth: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div>
                    <p className="font-semibold text-gray-900 mb-4">Change Password</p>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" className="mt-1" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Show Company Profile Publicly</p>
                      <p className="text-sm text-gray-600">Allow candidates to view your company profile</p>
                    </div>
                    <Switch
                      checked={privacy.showCompanyProfile}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, showCompanyProfile: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Allow Search Engine Indexing</p>
                      <p className="text-sm text-gray-600">Let search engines discover your job postings</p>
                    </div>
                    <Switch
                      checked={privacy.allowSearchEngines}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, allowSearchEngines: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-gray-600" />
                    Active Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">Current Session</p>
                        <p className="text-sm text-gray-600">Chrome on MacOS • Bangalore, India</p>
                      </div>
                      <Badge className="bg-green-600">Active Now</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional Plan</h3>
                      <p className="text-gray-600 mb-4">
                        Up to 3 active jobs, unlimited candidates, advanced analytics
                      </p>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold text-gray-900">₹4,999</span>
                        <span className="text-gray-600">/month</span>
                      </div>
                      <Badge className="bg-red-600">Active until Mar 9, 2026</Badge>
                    </div>
                    <Button variant="outline">Upgrade Plan</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/2026</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: 'Feb 9, 2026', amount: '₹4,999', status: 'Paid' },
                      { date: 'Jan 9, 2026', amount: '₹4,999', status: 'Paid' },
                      { date: 'Dec 9, 2025', amount: '₹4,999', status: 'Paid' }
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{invoice.date}</p>
                          <p className="text-sm text-gray-600">{invoice.amount}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{invoice.status}</Badge>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team */}
          <TabsContent value="team">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-red-600" />
                        Team Members
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">Manage who has access to your account</p>
                    </div>
                    <Button>Invite Member</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'You', email: 'admin@acme.com', role: 'Owner', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
                      { name: 'Sarah Johnson', email: 'sarah@acme.com', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
                      { name: 'Mike Chen', email: 'mike@acme.com', role: 'Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-semibold text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{member.role}</Badge>
                          {member.role !== 'Owner' && (
                            <Button variant="ghost" size="sm">Remove</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Delete Account</p>
                      <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
