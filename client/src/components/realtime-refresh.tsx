import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Activity, Clock, Database } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface RefreshResponse {
  message: string;
  added: number;
  categories: {
    news: number;
    research: number;
    tools: number;
    tutorials: number;
  };
  lastUpdate: string;
}

interface StatusResponse {
  totalItems: number;
  categories: {
    news: number;
    research: number;
    tools: number;
    tutorials: number;
  };
  latestUpdate: string;
  sources: string[];
}

export function RealTimeRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  // Get current status
  const { data: status, isLoading } = useQuery<StatusResponse>({
    queryKey: ['/api/realtime-status'],
    refetchInterval: 60000, // Refresh every minute
  });

  // Refresh mutation
  const refreshMutation = useMutation({
    mutationFn: async (): Promise<RefreshResponse> => {
      const response = await apiRequest('/api/refresh-realtime-content', 'POST');
      return response;
    },
    onMutate: () => setIsRefreshing(true),
    onSuccess: (data: RefreshResponse) => {
      // Invalidate content queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      queryClient.invalidateQueries({ queryKey: ['/api/realtime-status'] });
      setIsRefreshing(false);
    },
    onError: () => setIsRefreshing(false)
  });

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 animate-pulse text-blue-500" />
            Real-Time AI Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Real-Time AI Content
        </CardTitle>
        <CardDescription>
          Live updates from OpenAI, Google AI, arXiv, and developer platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        {status && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{status.categories.news}</div>
              <div className="text-sm text-gray-600">News</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{status.categories.research}</div>
              <div className="text-sm text-gray-600">Research</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{status.categories.tools}</div>
              <div className="text-sm text-gray-600">Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{status.categories.tutorials}</div>
              <div className="text-sm text-gray-600">Tutorials</div>
            </div>
          </div>
        )}

        {/* Sources */}
        {status?.sources && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Active Sources:</div>
            <div className="flex flex-wrap gap-2">
              {status.sources.map((source, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {source}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Last Update */}
        {status?.latestUpdate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            Last update: {formatTime(status.latestUpdate)}
          </div>
        )}

        {/* Refresh Button */}
        <Button
          onClick={() => refreshMutation.mutate()}
          disabled={isRefreshing}
          className="w-full"
          size="sm"
        >
          {isRefreshing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <Database className="h-4 w-4 mr-2" />
              Refresh Real-Time Content
            </>
          )}
        </Button>

        {/* Success Message */}
        {refreshMutation.isSuccess && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="text-sm text-green-800">
              ✓ Successfully refreshed with {(refreshMutation.data as RefreshResponse)?.added} new items
            </div>
          </div>
        )}

        {/* Error Message */}
        {refreshMutation.isError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="text-sm text-red-800">
              Failed to refresh content. Please try again.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}