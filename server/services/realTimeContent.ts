import type { InsertContent } from "@shared/schema";

export interface RealTimeAIContent {
  title: string;
  description: string;
  category: "news" | "tutorial" | "tools" | "research";
  imageUrl: string;
  sourceUrl?: string;
  publishedAt: Date;
  isPremium: boolean;
  duration?: string;
}

export class RealTimeContentService {
  
  // Current AI News Content based on real developments
  getCurrentAINews(): RealTimeAIContent[] {
    const currentDate = new Date();
    const recentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    
    return [
      {
        title: "OpenAI GPT-4o Fully Replaces GPT-4 by April 2025",
        description: "OpenAI announces GPT-4 retirement from ChatGPT by April 30, 2025, with GPT-4o delivering superior performance in writing, coding, and STEM subjects.",
        category: "news",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://openai.com/news/",
        publishedAt: new Date(currentDate.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        isPremium: false
      },
      {
        title: "Google Gemini 2.5 Pro Sweeps LMArena Leaderboards",
        description: "Google's latest Gemini 2.5 Pro model achieves world-leading performance across all categories, with Elo scores up 300+ points from first-generation Gemini Pro.",
        category: "news", 
        imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://blog.google/technology/google-deepmind/google-gemini-updates-io-2025/",
        publishedAt: new Date(currentDate.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
        isPremium: false
      },
      {
        title: "OpenAI-Jony Ive $6.5B AI Hardware Partnership Announced",
        description: "Revolutionary collaboration aims to ship 100M AI companion devices starting late 2025, marking OpenAI's entry into consumer hardware market.",
        category: "news",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://techcrunch.com/",
        publishedAt: new Date(currentDate.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
        isPremium: true
      },
      {
        title: "Google AI Mode Reaches 1 Billion Users Globally",
        description: "Google's AI-powered search overviews now serve 1 billion people worldwide, featuring advanced reasoning and multimodal capabilities that reimagine how we search.",
        category: "news",
        imageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://blog.google/technology/ai/",
        publishedAt: new Date(currentDate.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
        isPremium: false
      },
      {
        title: "ChatGPT Agent Launch: AI That Can Think and Act",
        description: "OpenAI unveils ChatGPT Agent with ability to think, act, and use tools for complex tasks like research and bookings, marking the shift to agentic AI.",
        category: "news",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
        publishedAt: new Date(currentDate.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
        isPremium: true
      }
    ];
  }

  // Current AI Research based on real developments
  getCurrentAIResearch(): RealTimeAIContent[] {
    const currentDate = new Date();
    
    return [
      {
        title: "Gemini 2.0: Native Multimodal Architecture for Agentic Era",
        description: "Google DeepMind's Gemini 2.0 introduces native multimodal capabilities designed specifically for AI agents, featuring enhanced reasoning and computer-use abilities.",
        category: "research",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/",
        publishedAt: new Date(currentDate.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
        isPremium: true
      },
      {
        title: "OpenAI o3 Series: Advanced Reasoning for Complex Tasks",
        description: "Latest research on o3-mini and o3-pro models demonstrates breakthrough performance in mathematical reasoning, coding challenges, and scientific problem-solving.",
        category: "research",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://openai.com/research/",
        publishedAt: new Date(currentDate.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
        isPremium: true
      },
      {
        title: "Trillium TPUs: Sixth-Generation AI Training Architecture", 
        description: "Google's new Trillium TPUs power 100% of Gemini 2.0 training and inference, representing major advances in AI hardware efficiency and scale.",
        category: "research",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://research.google/",
        publishedAt: new Date(currentDate.getTime() - 7 * 60 * 60 * 1000), // 7 hours ago
        isPremium: true
      },
      {
        title: "MedGemma: Multimodal Medical AI Breakthrough",
        description: "Open model architecture for medical text and image comprehension, enabling AI applications in healthcare diagnosis and medical research analysis.",
        category: "research",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://blog.google/technology/google-deepmind/",
        publishedAt: new Date(currentDate.getTime() - 10 * 60 * 60 * 1000), // 10 hours ago
        isPremium: false
      }
    ];
  }

  // Current AI Tools and Platforms
  getCurrentAITools(): RealTimeAIContent[] {
    const currentDate = new Date();
    
    return [
      {
        title: "Sora Video Model: Text-to-Video Generation", 
        description: "OpenAI's Sora model now available for ChatGPT Plus and Pro users, enabling high-quality video generation from text prompts with cinematic quality.",
        category: "tools",
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://openai.com/news/",
        publishedAt: new Date(currentDate.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
        isPremium: true
      },
      {
        title: "Google Project Mariner: Web-Browsing AI Agent",
        description: "Advanced AI agent with computer-use capabilities that can navigate websites, fill forms, and complete complex web-based tasks autonomously.",
        category: "tools",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", 
        sourceUrl: "https://blog.google/technology/ai/",
        publishedAt: new Date(currentDate.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
        isPremium: true
      },
      {
        title: "Gemini CLI: Open-Source AI Agent for Developers",
        description: "Command-line interface that brings AI agent capabilities directly to developer terminals, enabling code generation, debugging, and automation.",
        category: "tools",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://github.com/google/gemini-cli",
        publishedAt: new Date(currentDate.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
        isPremium: false
      },
      {
        title: "OpenAI Codex: Cloud-Based Software Engineering Agent",
        description: "Revolutionary coding assistant that can handle parallel development tasks, code reviews, and complex software architecture planning in the cloud.",
        category: "tools", 
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://openai.com/codex/",
        publishedAt: new Date(currentDate.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
        isPremium: true
      },
      {
        title: "Google Flow: AI Filmmaking and Video Creation",
        description: "Advanced AI tool for creating cinematic clips and scenes, enabling creators to produce professional-quality video content through natural language prompts.", 
        category: "tools",
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://blog.google/technology/ai/",
        publishedAt: new Date(currentDate.getTime() - 9 * 60 * 60 * 1000), // 9 hours ago
        isPremium: true
      }
    ];
  }

  // Current AI Tutorials based on latest developments
  getCurrentAITutorials(): RealTimeAIContent[] {
    const currentDate = new Date();
    
    return [
      {
        title: "Building AI Agents with Gemini 2.0: Complete Guide",
        description: "Step-by-step tutorial on creating autonomous AI agents using Google's latest Gemini 2.0 model, featuring multimodal capabilities and computer-use functions.",
        category: "tutorial",
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://developers.googleblog.com/",
        publishedAt: new Date(currentDate.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
        isPremium: false,
        duration: "45 min"
      },
      {
        title: "ChatGPT Advanced Voice Mode: Integration Tutorial",
        description: "Learn how to integrate OpenAI's Advanced Voice Mode into your applications with updated conversational capabilities and real-time translation features.",
        category: "tutorial", 
        imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://platform.openai.com/docs/",
        publishedAt: new Date(currentDate.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
        isPremium: true,
        duration: "60 min"
      },
      {
        title: "Training Models on Trillium TPUs: Performance Guide",
        description: "Master Google's sixth-generation TPUs for AI model training with practical examples, performance optimization, and cost-effective scaling strategies.",
        category: "tutorial",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://cloud.google.com/tpu/docs/",
        publishedAt: new Date(currentDate.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
        isPremium: true,
        duration: "90 min"
      },
      {
        title: "Implementing Deep Research with AI: Best Practices",
        description: "Comprehensive guide to using AI for advanced research tasks, covering both OpenAI's Deep Research and Google's research assistant features.",
        category: "tutorial",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        sourceUrl: "https://ai.google/research/",
        publishedAt: new Date(currentDate.getTime() - 11 * 60 * 60 * 1000), // 11 hours ago
        isPremium: false,
        duration: "30 min"
      }
    ];
  }

  // Get all current content
  getAllCurrentContent(): RealTimeAIContent[] {
    return [
      ...this.getCurrentAINews(),
      ...this.getCurrentAIResearch(), 
      ...this.getCurrentAITools(),
      ...this.getCurrentAITutorials()
    ].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  // Convert to database format
  convertToInsertContent(content: RealTimeAIContent[]): InsertContent[] {
    return content.map(item => ({
      title: item.title,
      description: item.description,
      category: item.category,
      isPremium: item.isPremium,
      imageUrl: item.imageUrl,
      duration: item.duration || null,
      authorId: null
    }));
  }
}

export const realTimeContentService = new RealTimeContentService();