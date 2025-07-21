import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ContentCard from "@/components/content-card";
import SubscriptionCTA from "@/components/subscription-cta";
import TrendingTopics from "@/components/trending-topics";
import { Button } from "@/components/ui/button";
import type { Content } from "@shared/schema";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: content = [], isLoading } = useQuery<Content[]>({
    queryKey: ["/api/content", { category: selectedCategory, search: searchQuery }],
  });

  const categories = [
    { id: "all", name: "All" },
    { id: "news", name: "News" },
    { id: "tutorial", name: "Tutorials" },
    { id: "tools", name: "Tools" },
    { id: "research", name: "Research" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("all"); // Reset category when searching
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Reset search when changing category
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <HeroSection onSearch={handleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Content Categories */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Explore AI Content"}
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "secondary"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="loading-spinner" aria-label="Loading content" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.map((item) => (
                  <ContentCard key={item.id} content={item} />
                ))}
              </div>
              
              {content.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    {searchQuery 
                      ? `No results found for "${searchQuery}"` 
                      : "No content available in this category"
                    }
                  </p>
                </div>
              )}
              
              {content.length > 0 && (
                <div className="text-center mt-12">
                  <Button size="lg" className="font-semibold">
                    Load More Content
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
        
        <SubscriptionCTA />
        <TrendingTopics />
      </main>
      
      <Footer />
    </div>
  );
}
