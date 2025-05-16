
import React from 'react';
import { ChefHat } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              ExpiryPlate - Reduce food waste with AI-powered recipes
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 ExpiryPlate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
