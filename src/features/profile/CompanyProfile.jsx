import React from 'react';
import { companyProfile as p } from '../../data/seed';
import { Edit, MapPin, Globe, Mail, Phone, CheckCircle } from '../../icons';

export default function CompanyProfile() {
  return (
    <div className="p-8 anim">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Company Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your company information</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800">
          <Edit size={15}/>Edit Profile
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-4 border-red-100 flex items-center justify-center text-2xl font-bold text-gray-500">AC</div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">{p.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              {[p.industry, p.size, p.founded].map(t => <span key={t} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">{t}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">About Company</h3>
        <p className="text-gray-600 leading-relaxed">{p.about}</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-5">Contact Information</h3>
        <div className="grid grid-cols-2 gap-6">
          {[
            {i:<MapPin size={18} className="text-red-500"/>,l:"Location",v:p.location,b:"bg-red-50"},
            {i:<Globe size={18} className="text-blue-500"/>,l:"Website",v:p.website,b:"bg-blue-50"},
            {i:<Mail size={18} className="text-green-500"/>,l:"Email",v:p.email,b:"bg-green-50"},
            {i:<Phone size={18} className="text-amber-500"/>,l:"Phone",v:p.phone,b:"bg-amber-50"},
          ].map((c,idx)=>(
            <div key={idx} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${c.b} flex items-center justify-center`}>{c.i}</div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{c.l}</p>
                <p className="text-sm font-semibold text-gray-800">{c.v}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Benefits & Perks</h3>
        <div className="flex flex-wrap gap-2">
          {p.perks.map(pk => <span key={pk} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 flex items-center gap-1.5"><CheckCircle size={14} className="text-green-500"/>{pk}</span>)}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-5">Hiring Stats</h3>
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            {v:p.stats.jobsPosted,l:"Total Jobs Posted",c:"text-red-600"},
            {v:p.stats.totalApplications,l:"Total Applications",c:"text-blue-600"},
            {v:p.stats.successfulHires,l:"Successful Hires",c:"text-green-600"}
          ].map((s,i)=>(
            <div key={i}>
              <p className={`text-4xl font-extrabold ${s.c}`}>{s.v}</p>
              <p className="text-sm text-gray-500 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}