import { Link, useLocation } from "react-router-dom";
import { Sparkles, Gamepad2, Heart, Flower2, MessageCircle, Sun, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavigationProps {
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLogout }) => {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Get user data
  const user = JSON.parse(localStorage.getItem('mindcanvas_user') || '{}');
  const userName = user.name || 'Friend';
  const userInitial = userName.charAt(0).toUpperCase();

  const navItems = [
    { path: "/", label: "Home", icon: Sparkles },
    { path: "/games", label: "Games", icon: Gamepad2 },
    { path: "/mood", label: "Mood", icon: Heart },
    { path: "/zen-garden", label: "Zen Garden", icon: Flower2 },
    { path: "/chat", label: "AI Chat", icon: MessageCircle },
    { path: "/mindful", label: "Mindful", icon: Sun },
  ];

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border z-50 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MindCanvas
              </span>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
                      isActive 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive && "animate-bounce-in")} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted/50 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center text-white font-semibold text-sm">
                  {userInitial}
                </div>
                <span className="text-sm font-medium hidden lg:block">{userName}</span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center text-white font-semibold">
                        {userInitial}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{userName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 shadow-soft">
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-between h-16">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 min-w-[60px]",
                    isActive 
                      ? "text-primary bg-primary/10 scale-105" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive && "animate-bounce-in")} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Mobile User Button */}
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 min-w-[60px]",
                showUserMenu ? "text-primary bg-primary/10" : "text-muted-foreground"
              )}
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center text-white font-semibold text-[10px]">
                {userInitial}
              </div>
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>

        {/* Mobile User Menu */}
        {showUserMenu && (
          <div className="absolute bottom-20 right-4 left-4 bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center text-white font-semibold text-lg">
                  {userInitial}
                </div>
                <div>
                  <p className="font-semibold">{userName}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setShowUserMenu(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;