import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Infinity, Download, Users, ChevronDown, ChevronUp, Star, Clock, Shield } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function SubscriptionCTA() {
  const [showDetails, setShowDetails] = useState(false);
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
              onClick={() => setShowDetails(!showDetails)}
            >
              View Pricing Plans
              {showDetails ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          </div>
          
          <p className="text-blue-100 text-sm mt-4">
            Instant access • Cancel anytime
          </p>
          
          {/* Expanded Details Section */}
          {showDetails && (
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="grid md:grid-cols-2 gap-8 text-left">
                {/* Pricing Column */}
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-yellow-300" />
                    <h3 className="text-xl font-bold">AI Hub Pro</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2">$19<span className="text-lg font-normal">/month</span></div>
                  <p className="text-blue-100 mb-4">Billed monthly • Cancel anytime</p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Infinity className="h-4 w-4" />
                      <span>Unlimited premium content access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download articles for offline reading</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Exclusive expert community</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Early access to new content</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Ad-free experience</span>
                    </li>
                  </ul>
                </div>
                
                {/* What You Get Column */}
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">What You Get Access To</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-100">Premium Tutorials</h4>
                      <p className="text-sm text-blue-200">In-depth guides on GPT-4, Claude, Midjourney, and more</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-100">Research Papers</h4>
                      <p className="text-sm text-blue-200">Latest AI research summaries and analysis</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-100">Expert Insights</h4>
                      <p className="text-sm text-blue-200">Weekly insights from AI industry leaders</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-100">Tool Reviews</h4>
                      <p className="text-sm text-blue-200">Comprehensive reviews of new AI tools and platforms</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-100">Community Access</h4>
                      <p className="text-sm text-blue-200">Join discussions with AI professionals and enthusiasts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
