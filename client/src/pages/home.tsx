import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ContentCard from "@/components/content-card";
import SubscriptionCTA from "@/components/subscription-cta";
import TrendingTopics from "@/components/trending-topics";
import { RealTimeRefresh } from "@/components/realtime-refresh";
import { Button } from "@/components/ui/button";
import type { Content } from "@shared/schema";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: content = [], isLoading } = useQuery<Content[]>({
    queryKey: ["/api/content", selectedCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      
      const response = await fetch(`/api/content?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      return response.json();
    },
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Content Categories */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Explore AI Content"}
            </h2>
            
            <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {content.map((item) => (
                  <ContentCard key={item.id} content={item} />
                ))}
              </div>
              
              {content.length === 0 && (
                <div className="text-center py-8 sm:py-12 px-4">
                  <p className="text-gray-600 text-base sm:text-lg">
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

        {/* Real-Time Content Management */}
        <section className="mb-12 sm:mb-16">
          <RealTimeRefresh />
        </section>
        
        <SubscriptionCTA />
        <TrendingTopics />
      </main>
      
      <Footer />
    </div>
  );
}
