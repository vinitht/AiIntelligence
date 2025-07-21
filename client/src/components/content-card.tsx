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
      <Card className="content-card group cursor-pointer">
        <div className="relative">
          <img 
            src={content.imageUrl} 
            alt={content.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {content.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {content.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{formatTimeAgo(content.createdAt!)}</span>
              </div>
              
              <div className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                <span>{formatViewCount(content.viewCount || 0)} views</span>
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
