import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Building2, Mail, Briefcase } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  email: string;
  jobsCreated: number;
  initials: string;
  color: string;
}

const companies: Company[] = [
  {
    id: '1',
    name: 'Acme Corp',
    email: 'admin@acme.com',
    jobsCreated: 12,
    initials: 'AC',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'TechVision Solutions',
    email: 'hr@techvision.io',
    jobsCreated: 8,
    initials: 'TV',
    color: 'bg-purple-500'
  },
  {
    id: '3',
    name: 'Global Innovations Inc',
    email: 'talent@globalinno.com',
    jobsCreated: 15,
    initials: 'GI',
    color: 'bg-green-500'
  },
  {
    id: '4',
    name: 'StartupHub Ventures',
    email: 'recruiting@startuphub.com',
    jobsCreated: 5,
    initials: 'SH',
    color: 'bg-orange-500'
  },
  {
    id: '5',
    name: 'Enterprise Systems Ltd',
    email: 'careers@enterprise-sys.com',
    jobsCreated: 20,
    initials: 'ES',
    color: 'bg-red-500'
  },
  {
    id: '6',
    name: 'Digital Wave Technologies',
    email: 'jobs@digitalwave.tech',
    jobsCreated: 10,
    initials: 'DW',
    color: 'bg-indigo-500'
  }
];

export const AdminPanel: React.FC = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Overview of all companies using the ReXruiters platform</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Companies</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{companies.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs Created</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {companies.reduce((acc, company) => acc + company.jobsCreated, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Jobs per Company</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {Math.round(companies.reduce((acc, company) => acc + company.jobsCreated, 0) / companies.length)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow duration-200 cursor-default">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  {/* Company Logo/Initials */}
                  <div className={`w-16 h-16 ${company.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xl font-bold">{company.initials}</span>
                  </div>
                  
                  {/* Company Info */}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-1 truncate">{company.name}</CardTitle>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{company.email}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Jobs Created</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{company.jobsCreated}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
