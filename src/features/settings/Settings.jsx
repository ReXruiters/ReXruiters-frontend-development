import React, { useState } from 'react';
import { Mail, Settings } from '../../icons';

export default function SettingsPage() {
  const [tab, setTab] = useState('general');
  const [theme, setTheme] = useState('Light');

  return (
    <div className="p-8 anim">
      <div className="flex items-center gap-2 mb-6">
        {['General','Notifications','Security','Billing','Team'].map(t => (
          <button key={t} onClick={() => setTab(t.toLowerCase())} className={`px-5 py-2 rounded-full text-sm font-semibold ${tab === t.toLowerCase() ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'general' ? (
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-lg">🎨</span>
              <h3 className="text-lg font-bold text-gray-900">Appearance</h3>
            </div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm font-semibold text-gray-800">Theme</p>
                <p className="text-xs text-gray-500">Choose your preferred theme</p>
              </div>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                {['Light','Dark','Auto'].map(t => (
                  <button key={t} onClick={() => setTheme(t)} className={`px-4 py-2 text-sm font-medium ${theme === t ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-5">
              <div>
                <p className="text-sm font-semibold text-gray-800">Language</p>
                <p className="text-xs text-gray-500">Select your preferred language</p>
              </div>
              <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium text-gray-700">English (US)</span>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5"><Mail size={20} className="text-gray-600"/><h3 className="text-lg font-bold text-gray-900">Email Preferences</h3></div>
            <div className="space-y-4">
              <div><p className="text-sm font-medium text-gray-700 mb-1.5">Primary Email</p><div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-600 border border-gray-200">admin@acme.com</div></div>
              <div><p className="text-sm font-medium text-gray-700 mb-1.5">Reply-to Email (for candidates)</p><div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-600 border border-gray-200">careers@acme.com</div></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-400">
          <Settings size={48} className="mx-auto mb-3 opacity-30"/>
          <p className="text-lg font-medium capitalize">{tab} settings coming soon</p>
        </div>
      )}
    </div>
  );
}
