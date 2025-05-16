
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat, Menu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Inventory', path: '/#inventory' },
    { name: 'Scan', path: '/#scan' },
    { name: 'Recipes', path: '/#recipes' },
  ];

  const isActive = (path: string) => {
    const currentPath = location.pathname + location.hash;
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">ExpiryPlate</span>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant={isActive(item.path) ? "default" : "ghost"}
              className="text-sm font-medium"
              onClick={() => {
                navigate(item.path);
              }}
            >
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in absolute w-full bg-background border-b py-2">
          <nav className="container flex flex-col gap-2 px-4">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant={isActive(item.path) ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
