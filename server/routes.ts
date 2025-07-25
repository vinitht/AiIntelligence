import type { Express } from "express";
import { createServer, type Server } from "http";
import { getStorage } from "./storage";
import { realTimeContentService } from "./services/realTimeContent";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Content routes
  app.get("/api/content", async (req, res) => {
    try {
      const storage = await getStorage();
      const { category, search } = req.query;
      let content;
      
      if (search && typeof search === 'string') {
        content = await storage.searchContent(search);
      } else if (category && typeof category === 'string') {
        content = await storage.getContentByCategory(category);
      } else {
        content = await storage.getAllContent();
      }
      
      res.json(content);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching content: " + error.message });
    }
  });

  app.get("/api/content/:id", async (req, res) => {
    try {
      const storage = await getStorage();
      const id = parseInt(req.params.id);
      const content = await storage.getContentById(id);
      
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      
      // Increment view count
      await storage.incrementViewCount(id);
      
      res.json(content);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching content: " + error.message });
    }
  });

  // Topics route
  app.get("/api/topics", async (req, res) => {
    try {
      const storage = await getStorage();
      const topics = await storage.getAllTopics();
      res.json(topics);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching topics: " + error.message });
    }
  });

  // Mock subscription route for development (replace with real payment processor)
  app.post('/api/create-subscription', async (req, res) => {
    try {
      const { email, name } = req.body;
      
      if (!email || !name) {
        return res.status(400).json({ message: "Email and name are required" });
      }

      // Mock subscription creation - simulate successful payment setup
      const mockSubscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const mockCustomerId = `cus_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const mockClientSecret = `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`;

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      res.json({
        subscriptionId: mockSubscriptionId,
        customerId: mockCustomerId,
        clientSecret: mockClientSecret,
        status: 'requires_payment_method'
      });
    } catch (error: any) {
      console.error('Subscription creation error:', error);
      return res.status(400).json({ message: error.message });
    }
  });

  // Mock payment confirmation route
  app.post('/api/confirm-payment', async (req, res) => {
    try {
      const { subscriptionId, paymentMethodId } = req.body;
      
      if (!subscriptionId) {
        return res.status(400).json({ message: "Subscription ID is required" });
      }

      // Mock payment confirmation - simulate successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      res.json({
        status: 'succeeded',
        subscriptionStatus: 'active',
        message: 'Payment successful! Welcome to AI Hub Pro!'
      });
    } catch (error: any) {
      console.error('Payment confirmation error:', error);
      return res.status(400).json({ message: error.message });
    }
  });

  // Check subscription status
  app.post('/api/check-subscription', async (req, res) => {
    try {
      const { subscriptionId } = req.body;
      
      if (!subscriptionId) {
        return res.status(400).json({ message: "Subscription ID is required" });
      }

      // Mock subscription status check
      res.json({
        status: 'active',
        active: true
      });
    } catch (error: any) {
      console.error('Subscription check error:', error);
      return res.status(400).json({ message: error.message });
    }
  });

  // Real-time content refresh endpoint
  app.post('/api/refresh-realtime-content', async (req, res) => {
    try {
      const storage = await getStorage();
      
      // Get current real-time AI content
      const currentContent = realTimeContentService.getAllCurrentContent();
      
      // Convert to database format
      const contentToAdd = realTimeContentService.convertToInsertContent(currentContent);
      
      // Clear existing content and add fresh real-time content
      await storage.clearAllContent();
      
      // Add new real-time content
      let addedCount = 0;
      for (const contentItem of contentToAdd) {
        try {
          await storage.createContent(contentItem);
          addedCount++;
        } catch (error) {
          console.error('Error adding content item:', error);
        }
      }

      res.json({ 
        message: `Successfully refreshed with ${addedCount} real-time AI content items`,
        added: addedCount,
        categories: {
          news: currentContent.filter(c => c.category === 'news').length,
          research: currentContent.filter(c => c.category === 'research').length,
          tools: currentContent.filter(c => c.category === 'tools').length,
          tutorials: currentContent.filter(c => c.category === 'tutorial').length
        },
        lastUpdate: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Real-time content refresh error:', error);
      return res.status(500).json({ message: error.message });
    }
  });

  // Get real-time content status
  app.get('/api/realtime-status', (req, res) => {
    const currentContent = realTimeContentService.getAllCurrentContent();
    res.json({
      totalItems: currentContent.length,
      categories: {
        news: currentContent.filter(c => c.category === 'news').length,
        research: currentContent.filter(c => c.category === 'research').length,
        tools: currentContent.filter(c => c.category === 'tools').length,
        tutorials: currentContent.filter(c => c.category === 'tutorial').length
      },
      latestUpdate: currentContent[0]?.publishedAt || new Date(),
      sources: ['OpenAI News', 'Google AI Blog', 'arXiv Research', 'Developer Platforms']
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
