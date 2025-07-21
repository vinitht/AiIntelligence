import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Play, BookOpen, Crown, Unlock } from "lucide-react";
import { Link } from "wouter";
import type { Content } from "@shared/schema";

interface ContentCardProps {
  content: Content;
}

const categoryIcons = {
  news: BookOpen,
  tutorial: Play,
  tools: BookOpen,
  research: BookOpen,
};

const categoryColors = {
  news: "bg-blue-500",
  tutorial: "bg-green-500",
  tools: "bg-purple-500",
  research: "bg-red-500",
};

export default function ContentCard({ content }: ContentCardProps) {
  const CategoryIcon = categoryIcons[content.category as keyof typeof categoryIcons] || BookOpen;
  const categoryColor = categoryColors[content.category as keyof typeof categoryColors] || "bg-blue-500";
  
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

  return (
    <Link href={`/content/${content.id}`}>
      <Card className="content-card group cursor-pointer hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <img 
            src={content.imageUrl} 
            alt={content.title}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <Badge className={`${categoryColor} text-white capitalize text-xs`}>
              {content.category}
            </Badge>
          </div>
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
            <Badge variant={content.isPremium ? "default" : "secondary"} className="text-xs">
              {content.isPremium ? (
                <>
                  <Crown className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                  Pro
                </>
              ) : (
                <>
                  <Unlock className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                  Free
                </>
              )}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight">
            {content.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-2">
            {content.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">{formatTimeAgo(content.createdAt!)}</span>
                <span className="sm:hidden">{formatTimeAgo(content.createdAt!).split(' ')[0]}</span>
              </div>
              
              <div className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                <span>{formatViewCount(content.viewCount || 0)}</span>
              </div>
            </div>
            
            {content.duration && (
              <div className="flex items-center">
                <Play className="h-3 w-3 mr-1" />
                <span>{content.duration}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
