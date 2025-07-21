import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Infinity, Download, Users } from "lucide-react";
import { Link } from "wouter";

export default function SubscriptionCTA() {
  return (
    <section className="mb-16">
      <Card className="gradient-cta p-8 md:p-12 text-white border-none">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock Premium AI Content
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get unlimited access to exclusive tutorials, research papers, and expert insights
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Infinity className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-1">Unlimited Access</h3>
              <p className="text-blue-100 text-sm">All premium content unlocked</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Download className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-1">Offline Reading</h3>
              <p className="text-blue-100 text-sm">Download for offline access</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-1">Expert Community</h3>
              <p className="text-blue-100 text-sm">Join exclusive discussions</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              asChild
              variant="secondary" 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 font-semibold"
            >
              <Link href="/subscribe">Subscribe Now</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold"
            >
              View Pricing Plans
            </Button>
          </div>
          
          <p className="text-blue-100 text-sm mt-4">
            Instant access • Cancel anytime
          </p>
        </div>
      </Card>
    </section>
  );
}
