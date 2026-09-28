import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Leaf, LayoutDashboard, UserPlus, Layers, FileText, ShoppingCart, TrendingUp, LogOut, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AppLayout() {
  const { role, setRole, language, toggleLanguage } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!role) {
    return <Outlet />;
  }

  const handleLogout = () => {
    setRole(null);
    navigate('/');
  };

  const navItems = {
    FPO: [
      { name: language === 'en' ? 'Dashboard' : 'डैशबोर्ड', path: '/fpo/dashboard', icon: LayoutDashboard },
      { name: language === 'en' ? 'Onboard Farmer' : 'किसान जोड़ें', path: '/fpo/onboard', icon: UserPlus },
      { name: language === 'en' ? 'Project Pooling' : 'प्रोजेक्ट पूलिंग', path: '/fpo/pooling', icon: Layers },
      { name: language === 'en' ? 'Payouts' : 'भुगतान', path: '/fpo/payouts', icon: FileText },
    ],
    VERIFIER: [
      { name: 'Project Queue', path: '/verifier/queue', icon: Layers },
    ],
    BUYER: [
      { name: 'Marketplace', path: '/buyer/marketplace', icon: ShoppingCart },
      { name: 'Forward Contract', path: '/buyer/contract', icon: FileText },
      { name: 'Price Forecast', path: '/buyer/forecast', icon: TrendingUp },
      { name: 'Carbon Wallet', path: '/buyer/wallet', icon: Layers },
    ],
    ADMIN: [
      { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    ]
  };

  const currentNav = navItems[role] || [];

  return (
    <div className="flex h-screen bg-background text-text font-ui">
      {/* Sidebar */}
      <aside className="w-64 border-r border-text/10 bg-white flex flex-col justify-between shadow-[2px_0_8px_rgba(0,0,0,0.02)]">
        <div>
          <div className="p-6 flex items-center gap-2">
            <Leaf className="text-primary w-6 h-6" />
            <h1 className="font-heading font-bold text-xl text-primary tracking-tight">ClimateCoins</h1>
          </div>
          
          <div className="px-4 py-2 mb-4">
            <div className="text-xs uppercase tracking-wider text-text/50 font-semibold px-2 mb-2">
              {role.replace('_', ' ')} MENU
            </div>
            <nav className="space-y-1">
              {currentNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                    location.pathname === item.path 
                      ? "bg-primary/10 text-primary" 
                      : "text-text/70 hover:bg-black/5 hover:text-text"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-text/10 space-y-2">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text/70 hover:bg-black/5 rounded-md transition-colors"
          >
            <Globe className="w-4 h-4" />
            {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {language === 'en' ? 'Logout' : 'लॉग आउट'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
