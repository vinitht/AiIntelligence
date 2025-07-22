import type { InsertContent } from "@shared/schema";

export interface RealWorldContent {
  title: string;
  description: string;
  category: "news" | "tutorial" | "tools" | "research";
  imageUrl: string;
  sourceUrl?: string;
  publishedAt?: Date;
}

export class ContentFetcher {
  
  // Fetch AI news from Hacker News API
  async fetchHackerNewsAI(): Promise<RealWorldContent[]> {
    try {
      // Get top stories
      const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const topStories = await topStoriesResponse.json();
      
      const aiContent: RealWorldContent[] = [];
      
      // Get first 50 stories and filter for AI-related content
      const storyPromises = topStories.slice(0, 50).map(async (id: number) => {
        try {
          const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          const story = await storyResponse.json();
          
          if (story && story.title && story.url) {
            const title = story.title.toLowerCase();
            const isAIRelated = title.includes('ai') || title.includes('artificial intelligence') || 
                              title.includes('machine learning') || title.includes('ml') ||
                              title.includes('neural') || title.includes('gpt') ||
                              title.includes('llm') || title.includes('deep learning') ||
                              title.includes('chatgpt') || title.includes('openai');
            
            if (isAIRelated) {
              return {
                title: story.title,
                description: story.title + " - Discussion and insights from the tech community.",
                category: "news" as const,
                imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
                sourceUrl: story.url,
                publishedAt: new Date(story.time * 1000)
              };
            }
          }
          return null;
        } catch (error) {
          console.error('Error fetching story:', error);
          return null;
        }
      });
      
      const stories = await Promise.all(storyPromises);
      aiContent.push(...stories.filter(story => story !== null));
      
      return aiContent.slice(0, 10); // Return top 10 AI stories
    } catch (error) {
      console.error('Error fetching Hacker News content:', error);
      return [];
    }
  }

  // Fetch from Reddit AI subreddits using JSON API
  async fetchRedditAI(): Promise<RealWorldContent[]> {
    try {
      const subreddits = ['MachineLearning', 'artificial', 'singularity', 'ChatGPT'];
      const allContent: RealWorldContent[] = [];
      
      for (const subreddit of subreddits) {
        try {
          const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`, {
            headers: {
              'User-Agent': 'AIHub-ContentFetcher/1.0'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            const posts = data.data.children;
            
            for (const post of posts) {
              const postData = post.data;
              if (postData.title && !postData.is_self) {
                allContent.push({
                  title: postData.title,
                  description: postData.selftext || `${postData.title} - From r/${subreddit}`,
                  category: "news" as const,
                  imageUrl: postData.thumbnail && postData.thumbnail.startsWith('http') 
                    ? postData.thumbnail 
                    : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
                  sourceUrl: postData.url,
                  publishedAt: new Date(postData.created_utc * 1000)
                });
              }
            }
          }
        } catch (error) {
          console.error(`Error fetching from r/${subreddit}:`, error);
        }
      }
      
      return allContent.slice(0, 15); // Return top 15 posts
    } catch (error) {
      console.error('Error fetching Reddit content:', error);
      return [];
    }
  }

  // Fetch AI research papers from arXiv
  async fetchArXivAI(): Promise<RealWorldContent[]> {
    try {
      const searchQuery = 'cat:cs.AI OR cat:cs.LG OR cat:cs.CL'; // AI, Machine Learning, Computational Linguistics
      const response = await fetch(`http://export.arxiv.org/api/query?search_query=${encodeURIComponent(searchQuery)}&start=0&max_results=10&sortBy=submittedDate&sortOrder=descending`);
      
      if (!response.ok) return [];
      
      const xmlText = await response.text();
      const content: RealWorldContent[] = [];
      
      // Simple XML parsing for arXiv entries
      const entries = xmlText.split('<entry>').slice(1);
      
      for (const entry of entries) {
        try {
          const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
          const summaryMatch = entry.match(/<summary>([\s\S]*?)<\/summary>/);
          const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
          
          if (titleMatch && summaryMatch) {
            const title = titleMatch[1].trim().replace(/\n\s+/g, ' ');
            const summary = summaryMatch[1].trim().replace(/\n\s+/g, ' ').substring(0, 200) + '...';
            const published = publishedMatch ? new Date(publishedMatch[1]) : new Date();
            
            content.push({
              title,
              description: summary,
              category: "research" as const,
              imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
              publishedAt: published
            });
          }
        } catch (error) {
          console.error('Error parsing arXiv entry:', error);
        }
      }
      
      return content.slice(0, 8); // Return top 8 papers
    } catch (error) {
      console.error('Error fetching arXiv content:', error);
      return [];
    }
  }

  // Generate AI tools content from known sources
  async fetchAITools(): Promise<RealWorldContent[]> {
    const toolsContent: RealWorldContent[] = [
      {
        title: "OpenAI ChatGPT - Conversational AI Assistant",
        description: "Advanced language model for conversations, writing, coding, and creative tasks with human-like responses.",
        category: "tools",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://chat.openai.com"
      },
      {
        title: "Google Colab - Free GPU/TPU for ML",
        description: "Cloud-based Jupyter notebook environment with free access to GPUs and TPUs for machine learning experiments.",
        category: "tools",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://colab.research.google.com"
      },
      {
        title: "Hugging Face Transformers",
        description: "Open-source library providing thousands of pre-trained models for natural language processing tasks.",
        category: "tools",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://huggingface.co/transformers"
      },
      {
        title: "TensorFlow - Open Source ML Platform",
        description: "End-to-end open source platform for machine learning with comprehensive tools and libraries.",
        category: "tools",
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://tensorflow.org"
      },
      {
        title: "PyTorch - Dynamic Neural Networks",
        description: "Python-first framework for deep learning research with strong GPU acceleration and dynamic computation graphs.",
        category: "tools",
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://pytorch.org"
      }
    ];
    
    return toolsContent;
  }

  // Aggregate all real-world content
  async fetchAllRealWorldContent(): Promise<RealWorldContent[]> {
    try {
      console.log('Fetching real-world AI content from multiple sources...');
      
      const [hackerNews, reddit, arxiv, tools] = await Promise.all([
        this.fetchHackerNewsAI(),
        this.fetchRedditAI(),
        this.fetchArXivAI(),
        this.fetchAITools()
      ]);
      
      const allContent = [...hackerNews, ...reddit, ...arxiv, ...tools];
      
      // Sort by publish date (newest first)
      allContent.sort((a, b) => {
        const dateA = a.publishedAt || new Date(0);
        const dateB = b.publishedAt || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
      
      console.log(`Fetched ${allContent.length} real-world content items`);
      return allContent;
      
    } catch (error) {
      console.error('Error fetching real-world content:', error);
      return [];
    }
  }

  // Convert to database format
  convertToInsertContent(realWorldContent: RealWorldContent[]): InsertContent[] {
    return realWorldContent.map(item => ({
      title: item.title,
      description: item.description,
      category: item.category,
      isPremium: Math.random() > 0.7, // Randomly mark ~30% as premium
      imageUrl: item.imageUrl,
      duration: item.category === 'tutorial' ? `${Math.floor(Math.random() * 60) + 10} min` : null,
      authorId: null
    }));
  }
}

export const contentFetcher = new ContentFetcher();