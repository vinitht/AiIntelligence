import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Clock, Eye, Crown, Unlock, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { Link } from "wouter";
import type { Content } from "@shared/schema";

export default function ContentPage() {
  const [, params] = useRoute("/content/:id");
  const contentId = params?.id ? parseInt(params.id) : null;

  const { data: content, isLoading } = useQuery<Content>({
    queryKey: ["/api/content", contentId],
    queryFn: async () => {
      const response = await fetch(`/api/content/${contentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      return response.json();
    },
    enabled: !!contentId,
  });

  const formatTimeAgo = (date: Date | string) => {
    const now = new Date();
    const contentDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - contentDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "1 day ago";
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return `${Math.floor(diffInHours / 168)} weeks ago`;
  };

  const formatViewCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}k`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <p className="text-gray-600 mb-6">The content you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryColors = {
    news: "bg-blue-500",
    tutorial: "bg-green-500",
    tools: "bg-purple-500",
    research: "bg-red-500",
  };

  const categoryColor = categoryColors[content.category as keyof typeof categoryColors] || "bg-blue-500";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-primary">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80">
            <img 
              src={content.imageUrl} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className={`${categoryColor} text-white capitalize`}>
                {content.category}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant={content.isPremium ? "default" : "secondary"}>
                {content.isPremium ? (
                  <>
                    <Crown className="h-3 w-3 mr-1" />
                    Pro
                  </>
                ) : (
                  <>
                    <Unlock className="h-3 w-3 mr-1" />
                    Free
                  </>
                )}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatTimeAgo(content.createdAt!)}</span>
                </div>
                
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{formatViewCount(content.viewCount || 0)} views</span>
                </div>
                
                {content.duration && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{content.duration} read</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content Body */}
            {content.isPremium ? (
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {content.description}
                </p>
                
                {/* Premium Content Paywall */}
                <Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-none">
                  <CardContent className="p-8 text-center">
                    <Crown className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Premium Content</h3>
                    <p className="text-blue-100 mb-6">
                      This is exclusive content for AI Hub Pro subscribers. 
                      Upgrade now to unlock full access to this article and thousands more.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <Button 
                        asChild
                        variant="secondary" 
                        size="lg"
                        className="bg-white text-primary hover:bg-gray-100 font-semibold"
                      >
                        <Link href="/subscribe">Upgrade to Pro</Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold"
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {content.description}
                </p>
                
                {/* Simulated article content */}
                <div className="space-y-4 text-gray-700">
                  <p>
                    This comprehensive guide covers the latest developments in artificial intelligence, 
                    providing you with practical insights and actionable knowledge to stay ahead in the 
                    rapidly evolving AI landscape.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Insights</h2>
                  <p>
                    Understanding the fundamental concepts and practical applications is crucial for 
                    anyone looking to leverage AI technologies effectively. This content provides 
                    real-world examples and best practices.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Implementation Guide</h2>
                  <p>
                    Step-by-step instructions and code examples help you implement these concepts 
                    in your own projects. Each section builds upon previous knowledge to create 
                    a comprehensive learning experience.
                  </p>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Pro Tip</h3>
                    <p className="text-blue-800">
                      For more advanced tutorials and exclusive content, consider upgrading to 
                      AI Hub Pro for unlimited access to our premium library.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
      
      <Footer />
    </div>
  );
}