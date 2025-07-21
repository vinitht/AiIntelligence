import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Brain, Search, User, Menu } from "lucide-react";
import MobileMenu from "./mobile-menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Brain className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-gray-900">AI Hub</span>
            </Link>
            
            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <button className="text-gray-700 hover:text-primary transition-colors font-medium">
                News
              </button>
              <button className="text-gray-700 hover:text-primary transition-colors font-medium">
                Tutorials
              </button>
              <button className="text-gray-700 hover:text-primary transition-colors font-medium">
                Tools
              </button>
              <button className="text-gray-700 hover:text-primary transition-colors font-medium">
                Research
              </button>
            </nav>
            
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-gray-700 hover:text-primary"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Button asChild>
                <Link href="/subscribe">Upgrade to Pro</Link>
              </Button>
              
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary">
                <User className="h-5 w-5" />
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}
