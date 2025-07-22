import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Globe, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ContentSource {
  name: string;
  description: string;
  category: string;
}

interface RefreshResponse {
  message: string;
  added: number;
  sources: string[];
}

export function ContentRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [sources] = useState<ContentSource[]>([
    { name: 'Hacker News', description: 'AI discussions from tech community', category: 'news' },
    { name: 'Reddit AI Communities', description: 'Posts from AI/ML subreddits', category: 'news' },
    { name: 'arXiv Papers', description: 'Latest AI research papers', category: 'research' },
    { name: 'AI Tools Directory', description: 'Popular AI development tools', category: 'tools' }
  ]);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const response = await apiRequest('/api/refresh-content', {
        method: 'POST'
      }) as RefreshResponse;

      setLastRefresh(new Date());
      toast({
        title: "Content Updated",
        description: `${response.added} new articles added from real-world sources`,
      });

      // Refresh the page to show new content
      setTimeout(() => window.location.reload(), 1000);
      
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to fetch new content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Real-World Content Integration
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Fetch the latest AI news, research, and tools from across the web
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((source, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{source.name}</div>
                <div className="text-sm text-muted-foreground">{source.description}</div>
              </div>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">{source.category}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {lastRefresh 
              ? `Last updated: ${lastRefresh.toLocaleTimeString()}`
              : "Never updated with real-world content"
            }
          </div>
          <Button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            {isRefreshing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            {isRefreshing ? "Fetching..." : "Refresh Content"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}