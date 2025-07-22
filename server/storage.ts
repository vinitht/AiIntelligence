import { users, content, topics, type User, type InsertUser, type Content, type InsertContent, type Topic, type InsertTopic } from "@shared/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, ilike, desc, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string): Promise<User>;
  updateUserProStatus(userId: number, isPro: boolean): Promise<User>;
  
  getAllContent(): Promise<Content[]>;
  getContentByCategory(category: string): Promise<Content[]>;
  getContentById(id: number): Promise<Content | undefined>;
  createContent(content: InsertContent): Promise<Content>;
  incrementViewCount(id: number): Promise<void>;
  searchContent(query: string): Promise<Content[]>;
  
  getAllTopics(): Promise<Topic[]>;
  createTopic(topic: InsertTopic): Promise<Topic>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private content: Map<number, Content>;
  private topics: Map<number, Topic>;
  private currentUserId: number;
  private currentContentId: number;
  private currentTopicId: number;

  constructor() {
    this.users = new Map();
    this.content = new Map();
    this.topics = new Map();
    this.currentUserId = 1;
    this.currentContentId = 1;
    this.currentTopicId = 1;
    
    // Initialize with sample content
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample content
    const sampleContent: Content[] = [
      {
        id: this.currentContentId++,
        title: "Latest Breakthrough in Large Language Models",
        description: "Discover the newest developments in AI language processing and their implications for the future of technology.",
        category: "news",
        isPremium: true,
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        viewCount: 1200,
        duration: null,
        authorId: null,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: this.currentContentId++,
        title: "Building Your First Neural Network",
        description: "Step-by-step guide to creating neural networks using Python and TensorFlow for beginners.",
        category: "tutorial",
        isPremium: false,
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        viewCount: 850,
        duration: "45 min",
        authorId: null,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        id: this.currentContentId++,
        title: "Top 10 AI Development Tools in 2024",
        description: "Comprehensive review of the most powerful AI development tools and platforms available today.",
        category: "tools",
        isPremium: true,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        viewCount: 892,
        duration: null,
        authorId: null,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
      {
        id: this.currentContentId++,
        title: "Quantum Computing Meets AI: New Possibilities",
        description: "Exploring the intersection of quantum computing and artificial intelligence in recent research findings.",
        category: "research",
        isPremium: true,
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        viewCount: 456,
        duration: null,
        authorId: null,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      },
      {
        id: this.currentContentId++,
        title: "Machine Learning Algorithms Explained",
        description: "Understanding the fundamentals of popular machine learning algorithms with practical examples.",
        category: "tutorial",
        isPremium: false,
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        viewCount: 1150,
        duration: "32 min",
        authorId: null,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        id: this.currentContentId++,
        title: "AI Ethics Guidelines Released by Tech Giants",
        description: "Major technology companies announce new ethical guidelines for AI development and deployment.",
        category: "news",
        isPremium: false,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        viewCount: 2800,
        duration: null,
        authorId: null,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      },
    ];

    sampleContent.forEach(item => {
      this.content.set(item.id, item);
    });

    // Sample topics
    const sampleTopics: Topic[] = [
      { id: this.currentTopicId++, name: "ChatGPT", icon: "fas fa-robot", articleCount: 2100 },
      { id: this.currentTopicId++, name: "Deep Learning", icon: "fas fa-brain", articleCount: 1800 },
      { id: this.currentTopicId++, name: "Computer Vision", icon: "fas fa-eye", articleCount: 1200 },
      { id: this.currentTopicId++, name: "NLP", icon: "fas fa-comments", articleCount: 950 },
    ];

    sampleTopics.forEach(topic => {
      this.topics.set(topic.id, topic);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      isPro: false,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { 
      ...user, 
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      isPro: true
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async updateUserProStatus(userId: number, isPro: boolean): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, isPro };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async getAllContent(): Promise<Content[]> {
    return Array.from(this.content.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getContentByCategory(category: string): Promise<Content[]> {
    return Array.from(this.content.values())
      .filter(item => category === "all" || item.category === category)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getContentById(id: number): Promise<Content | undefined> {
    return this.content.get(id);
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const id = this.currentContentId++;
    const contentItem: Content = { 
      ...insertContent, 
      id, 
      viewCount: 0,
      isPremium: insertContent.isPremium ?? false,
      createdAt: new Date()
    };
    this.content.set(id, contentItem);
    return contentItem;
  }

  async incrementViewCount(id: number): Promise<void> {
    const contentItem = this.content.get(id);
    if (contentItem) {
      contentItem.viewCount = (contentItem.viewCount || 0) + 1;
      this.content.set(id, contentItem);
    }
  }

  async searchContent(query: string): Promise<Content[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.content.values())
      .filter(item => 
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery)
      )
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getAllTopics(): Promise<Topic[]> {
    return Array.from(this.topics.values()).sort((a, b) => (b.articleCount || 0) - (a.articleCount || 0));
  }

  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const id = this.currentTopicId++;
    const topic: Topic = { 
      ...insertTopic, 
      id,
      articleCount: insertTopic.articleCount ?? 0
    };
    this.topics.set(id, topic);
    return topic;
  }
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    const sql = neon(process.env.DATABASE_URL);
    this.db = drizzle(sql);
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string): Promise<User> {
    const result = await this.db
      .update(users)
      .set({ 
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        isPro: true
      })
      .where(eq(users.id, userId))
      .returning();
    
    if (!result[0]) throw new Error("User not found");
    return result[0];
  }

  async updateUserProStatus(userId: number, isPro: boolean): Promise<User> {
    const result = await this.db
      .update(users)
      .set({ isPro })
      .where(eq(users.id, userId))
      .returning();
    
    if (!result[0]) throw new Error("User not found");
    return result[0];
  }

  async getAllContent(): Promise<Content[]> {
    return await this.db.select().from(content).orderBy(desc(content.createdAt));
  }

  async getContentByCategory(category: string): Promise<Content[]> {
    if (category === "all") {
      return await this.getAllContent();
    }
    return await this.db
      .select()
      .from(content)
      .where(eq(content.category, category))
      .orderBy(desc(content.createdAt));
  }

  async getContentById(id: number): Promise<Content | undefined> {
    const result = await this.db.select().from(content).where(eq(content.id, id)).limit(1);
    return result[0];
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const result = await this.db.insert(content).values(insertContent).returning();
    return result[0];
  }

  async incrementViewCount(id: number): Promise<void> {
    await this.db
      .update(content)
      .set({ viewCount: sql`${content.viewCount} + 1` })
      .where(eq(content.id, id));
  }

  async searchContent(query: string): Promise<Content[]> {
    return await this.db
      .select()
      .from(content)
      .where(
        sql`${content.title} ILIKE ${`%${query}%`} OR ${content.description} ILIKE ${`%${query}%`}`
      )
      .orderBy(desc(content.createdAt));
  }

  async getAllTopics(): Promise<Topic[]> {
    return await this.db.select().from(topics).orderBy(desc(topics.articleCount));
  }

  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const result = await this.db.insert(topics).values(insertTopic).returning();
    return result[0];
  }
}

// Initialize database storage and seed with sample data
async function initializeStorage(): Promise<IStorage> {
  const dbStorage = new DatabaseStorage();
  
  // Check if we have any content already
  const existingContent = await dbStorage.getAllContent();
  
  if (existingContent.length === 0) {
    console.log("Seeding database with initial content...");
    
    // Seed sample content
    const sampleContent = [
      {
        title: "Latest Breakthrough in Large Language Models",
        description: "Discover the newest developments in AI language processing and their implications for the future of technology.",
        category: "news",
        isPremium: true,
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        duration: null,
        authorId: null,
      },
      {
        title: "Building Your First Neural Network",
        description: "Step-by-step guide to creating neural networks using Python and TensorFlow for beginners.",
        category: "tutorial",
        isPremium: false,
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        duration: "45 min",
        authorId: null,
      },
      {
        title: "Top 10 AI Development Tools in 2024",
        description: "Comprehensive review of the most powerful AI development tools and platforms available today.",
        category: "tools",
        isPremium: true,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        duration: null,
        authorId: null,
      },
      {
        title: "Quantum Computing Meets AI: New Possibilities",
        description: "Exploring the intersection of quantum computing and artificial intelligence in recent research findings.",
        category: "research",
        isPremium: true,
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        duration: null,
        authorId: null,
      },
      {
        title: "Machine Learning Algorithms Explained",
        description: "Understanding the fundamentals of popular machine learning algorithms with practical examples.",
        category: "tutorial",
        isPremium: false,
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        duration: "32 min",
        authorId: null,
      },
      {
        title: "AI Ethics Guidelines Released by Tech Giants",
        description: "Major technology companies announce new ethical guidelines for AI development and deployment.",
        category: "news",
        isPremium: false,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        duration: null,
        authorId: null,
      },
    ];

    for (const contentItem of sampleContent) {
      await dbStorage.createContent(contentItem);
    }

    // Seed sample topics
    const sampleTopics = [
      { name: "ChatGPT", icon: "fas fa-robot", articleCount: 2100 },
      { name: "Deep Learning", icon: "fas fa-brain", articleCount: 1800 },
      { name: "Computer Vision", icon: "fas fa-eye", articleCount: 1200 },
      { name: "NLP", icon: "fas fa-comments", articleCount: 950 },
    ];

    for (const topic of sampleTopics) {
      await dbStorage.createTopic(topic);
    }

    console.log("Database seeded successfully!");
  }
  
  return dbStorage;
}

// Use database storage instead of memory storage
let storageInstance: IStorage;

export async function getStorage(): Promise<IStorage> {
  if (!storageInstance) {
    storageInstance = await initializeStorage();
  }
  return storageInstance;
}

// For backward compatibility, but initialize lazily
export const storage = new MemStorage();
