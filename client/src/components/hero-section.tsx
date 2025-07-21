import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "wouter";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleViewFeatures = () => {
    // Scroll to subscription CTA section
    const subscriptionSection = document.querySelector('[data-section="subscription-cta"]');
    if (subscriptionSection) {
      subscriptionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="gradient-hero py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Your Gateway to <span className="text-primary">AI Knowledge</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            Discover the latest AI news, tutorials, tools, and research. Stay ahead in the artificial intelligence revolution with curated content and expert insights.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search AI topics, tools..."
                className="search-input pr-16 text-base sm:text-lg py-3 sm:py-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-2 h-auto w-auto"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Button asChild size="lg" className="font-semibold w-full sm:w-auto">
              <Link href="/subscribe">Subscribe Now</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="font-semibold border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto"
              onClick={handleViewFeatures}
            >
              View Premium Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
