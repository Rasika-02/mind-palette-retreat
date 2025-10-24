import { Link, useLocation } from "react-router-dom";
import { Sparkles, Gamepad2, Heart, Flower2, MessageCircle, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Sparkles },
    { path: "/games", label: "Games", icon: Gamepad2 },
    { path: "/mood", label: "Mood", icon: Heart },
    { path: "/zen-garden", label: "Zen Garden", icon: Flower2 },
    { path: "/chat", label: "AI Chat", icon: MessageCircle },
    { path: "/mindful", label: "Mindful", icon: Sun },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 md:top-0 md:bottom-auto shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between md:justify-center md:gap-8 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-xl transition-all duration-300",
                  isActive 
                    ? "text-primary bg-primary/10 scale-105" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "animate-bounce-in")} />
                <span className="text-xs md:text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
