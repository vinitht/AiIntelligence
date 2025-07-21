import { Link } from "wouter";
import { Brain, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div 
        className={`mobile-menu-panel ${isOpen ? '' : 'mobile-menu-closed'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-gray-900">AI Hub</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-4">
            <Link 
              href="/" 
              className="block text-gray-700 hover:text-primary transition-colors font-medium py-2"
              onClick={onClose}
            >
              Home
            </Link>
            <button className="block text-gray-700 hover:text-primary transition-colors font-medium py-2 w-full text-left">
              News
            </button>
            <button className="block text-gray-700 hover:text-primary transition-colors font-medium py-2 w-full text-left">
              Tutorials
            </button>
            <button className="block text-gray-700 hover:text-primary transition-colors font-medium py-2 w-full text-left">
              Tools
            </button>
            <button className="block text-gray-700 hover:text-primary transition-colors font-medium py-2 w-full text-left">
              Research
            </button>
            
            <div className="border-t pt-6 mt-6 space-y-4">
              <Button asChild className="w-full touch-friendly">
                <Link href="/subscribe" onClick={onClose}>Upgrade to Pro</Link>
              </Button>
              
              <div className="flex items-center justify-center pt-2">
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary touch-friendly">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
