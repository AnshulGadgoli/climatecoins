import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Leaf, LayoutDashboard, UserPlus, Layers, FileText, ShoppingCart, TrendingUp, LogOut, Globe, Menu, X, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AppLayout() {
  const { role, setRole, language, setLanguage } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  if (!role) {
    return <Outlet />;
  }

  const handleLogout = () => {
    setRole(null);
    navigate('/');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setLanguage(lang);
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    }
  };

  const navItems = {
    FPO: [
      { name: 'Dashboard', path: '/fpo/dashboard', icon: LayoutDashboard },
      { name: 'Onboard Farmer', path: '/fpo/onboard', icon: UserPlus },
      { name: 'Project Pooling', path: '/fpo/pooling', icon: Layers },
      { name: 'Payouts', path: '/fpo/payouts', icon: FileText },
    ],
    DATACENTRE: [
      { name: 'Marketplace', path: '/datacentre/marketplace', icon: ShoppingCart },
      { name: 'Forward Contract', path: '/datacentre/contract', icon: FileText },
      { name: 'Price Forecast', path: '/datacentre/forecast', icon: TrendingUp },
      { name: 'Carbon Wallet', path: '/datacentre/wallet', icon: Layers },
    ],
    ADMIN: [
      { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Verification Queue', path: '/admin/verify', icon: ShieldCheck },
    ]
  };

  const currentNav = navItems[role] || [];

  return (
    <div className="flex h-screen bg-background text-text font-ui overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white flex flex-col justify-between shadow-[2px_0_8px_rgba(0,0,0,0.02)] transition-transform duration-300 md:relative md:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div>
          <div className="p-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Leaf className="text-primary w-6 h-6" />
              <h1 className="font-heading font-bold text-xl text-primary tracking-tight">ClimateCoins</h1>
            </Link>
            <button className="md:hidden text-text/70 hover:text-text" onClick={() => setIsMobileOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="px-4 py-2 mb-4">
            <div className="text-xs uppercase tracking-wider text-text/50 font-semibold px-2 mb-2">
              {role} MENU
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
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-text/10 space-y-4">
          <div className="relative">
            <div className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text/70 bg-black/5 rounded-md">
              <Globe className="w-4 h-4 shrink-0" />
              <select 
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent border-none w-full outline-none text-sm text-text/80 cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-text/10 shrink-0">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Leaf className="text-primary w-5 h-5" />
            <h1 className="font-heading font-bold text-lg text-primary tracking-tight">ClimateCoins</h1>
          </Link>
          <button onClick={() => setIsMobileOpen(true)} className="p-2 text-text/70 hover:bg-black/5 rounded-md">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 overflow-auto bg-background p-4 md:p-8">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
