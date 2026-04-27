import React from 'react';
import logoImage from '@/assets/rexruiter-logo.png';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Home, Plus, Briefcase, User, Settings, FileText, ChevronLeft, ChevronRight, Bell, LogOut, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/create-job', icon: Plus, label: 'Create Job', highlight: true },
  { 
    path: '/jobs', 
    icon: Briefcase, 
    label: 'Jobs',
    subItems: [
      { path: '/jobs/active', label: 'Active Jobs' },
      { path: '/jobs/drafts', label: 'Drafts' }
    ]
  },
  { path: '/admin', icon: Shield, label: 'Admin Panel' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/settings', icon: Settings, label: 'Settings' }
];

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['/jobs']);
  const [isCollapsed, setIsCollapsed] = React.useState(false);


  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col fixed h-screen transition-all duration-300`}>
        {/* Logo */}
        <div className={`p-6 border-b border-gray-200 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <img 
              src={logoImage} 
              alt="ReXruiters Logo" 
              className="h-10 w-auto" 
            />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-gray-100"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <TooltipProvider>
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.path}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isActive(item.path) ? 'secondary' : 'ghost'}
                        className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start'} ${
                          item.highlight 
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl'
                            : isActive(item.path) 
                              ? 'bg-red-50 text-red-700 hover:bg-red-100' 
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          if (item.subItems) {
                            if (isCollapsed) {
                              setIsCollapsed(false);
                            }
                            toggleExpand(item.path);
                          } else {
                            navigate(item.path);
                          }
                        }}
                      >
                        <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                        {!isCollapsed && (
                          <>
                            {item.label}
                            {item.subItems && (
                              <svg 
                                className={`w-4 h-4 ml-auto transition-transform ${
                                  expandedItems.includes(item.path) ? 'rotate-90' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </>
                        )}
                      </Button>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>

                  {/* Sub-items */}
                  {item.subItems && expandedItems.includes(item.path) && !isCollapsed && (
                    <ul className="mt-2 ml-8 space-y-1">
                      {item.subItems.map(subItem => (
                        <li key={subItem.path}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`w-full justify-start text-sm ${
                              location.pathname === subItem.path
                                ? 'bg-red-50 text-red-700'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            onClick={() => navigate(subItem.path)}
                          >
                            {subItem.label}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </TooltipProvider>
        </nav>

        {/* User Section */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Acme Corp</p>
                <p className="text-xs text-gray-500 truncate">admin@acme.com</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} flex flex-col transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Hello Acme Corp
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-red-200">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Acme Corp</p>
                    <p className="text-xs text-gray-500">admin@acme.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={() => navigate('/login')}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
