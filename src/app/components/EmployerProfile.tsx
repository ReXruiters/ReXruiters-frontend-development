import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Building2, MapPin, Users, Globe, Mail, Phone, Edit2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

export const EmployerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    companyName: 'Acme Corp',
    companyLogo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    industry: 'Technology',
    companySize: '50-200 employees',
    location: 'Bangalore, India',
    website: 'https://acmecorp.com',
    email: 'admin@acme.com',
    phone: '+91 98765 43210',
    description: 'Acme Corp is a leading technology company specializing in innovative software solutions. We are committed to building products that make a difference and fostering a culture of excellence and innovation.',
    founded: '2015',
    benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Learning Budget', 'Stock Options']
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile(prev => ({ ...prev, companyLogo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header with Edit Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
            <p className="text-gray-600">Manage your company information and branding</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Company Overview Card */}
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardContent className="p-8">
            <div className="flex items-start gap-8">
              {/* Company Logo */}
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-red-200">
                  <AvatarImage src={isEditing ? editedProfile.companyLogo : profile.companyLogo} />
                  <AvatarFallback className="text-3xl">
                    {profile.companyName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <Edit2 className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Company Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={editedProfile.companyName}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, companyName: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="industry">Industry</Label>
                        <Input
                          id="industry"
                          value={editedProfile.industry}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, industry: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="companySize">Company Size</Label>
                        <Input
                          id="companySize"
                          value={editedProfile.companySize}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, companySize: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{profile.companyName}</h2>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {profile.industry}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {profile.companySize}
                      </Badge>
                      <Badge variant="secondary">Founded {profile.founded}</Badge>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>About Company</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={editedProfile.description}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, description: e.target.value }))}
                rows={6}
                placeholder="Tell candidates about your company..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profile.description}</p>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={editedProfile.website}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://company.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{profile.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Website</p>
                    <a 
                      href={profile.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {profile.website}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{profile.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Benefits & Perks */}
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Benefits & Perks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {profile.benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                  ✓ {benefit}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <p className="text-sm text-gray-600 mt-4">
                Benefits can be managed in the Settings page
              </p>
            )}
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-gray-50 to-red-50">
          <CardHeader>
            <CardTitle>Hiring Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-1">12</div>
                <p className="text-sm text-gray-600">Total Jobs Posted</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">156</div>
                <p className="text-sm text-gray-600">Total Applications</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-1">23</div>
                <p className="text-sm text-gray-600">Successful Hires</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
