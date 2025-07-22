import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Brain, Eye, MessageSquare } from "lucide-react";
import type { Topic } from "@shared/schema";

const topicIcons = {
  "ChatGPT": Bot,
  "Deep Learning": Brain, 
  "Computer Vision": Eye,
  "NLP": MessageSquare,
};

export default function TrendingTopics() {
  const { data: topics = [], isLoading } = useQuery<Topic[]>({
    queryKey: ["/api/topics"],
  });

  if (isLoading) {
    return (
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending Topics</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-lg mx-auto mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Trending Topics</h2>
        <button className="text-primary hover:text-blue-600 font-medium transition-colors">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topics.map((topic) => {
          const IconComponent = topicIcons[topic.name as keyof typeof topicIcons] || Brain;
          
          return (
            <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 p-3 rounded-lg mx-auto mb-3 w-fit group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {topic.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {(topic.articleCount || 0).toLocaleString()} articles
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
