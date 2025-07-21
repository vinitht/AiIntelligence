import { useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Brain, Crown, Download, Users, Infinity, CreditCard, Lock } from "lucide-react";

const MockPaymentForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form data
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.nameOnCard) {
      toast({
        title: "Payment Failed",
        description: "Please fill in all payment details",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Mock payment processing
      await apiRequest("POST", "/api/confirm-payment", {
        subscriptionId: "mock_subscription_123",
        paymentMethodId: "mock_payment_method"
      });

      toast({
        title: "Payment Successful",
        description: "Welcome to AI Hub Pro! You now have access to all premium content.",
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "Payment processing failed",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Crown className="h-6 w-6 text-yellow-500" />
          Complete Your Subscription
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input
                id="nameOnCard"
                type="text"
                placeholder="John Doe"
                value={paymentData.nameOnCard}
                onChange={(e) => setPaymentData(prev => ({ ...prev, nameOnCard: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="4242 4242 4242 4242"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                maxLength={19}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 text-sm">
              <Lock className="h-4 w-4" />
              <span>Demo Mode - Use any test card details</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? "Processing..." : "Subscribe to Pro - $19/month"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default function Subscribe() {
  const [userInfo, setUserInfo] = useState({ email: "", name: "" });
  const [showPayment, setShowPayment] = useState(false);
  const [subscriptionComplete, setSubscriptionComplete] = useState(false);
  const { toast } = useToast();

  const handleStartSubscription = async () => {
    if (!userInfo.email || !userInfo.name) {
      toast({
        title: "Information Required",
        description: "Please fill in your email and name to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await apiRequest("POST", "/api/create-subscription", {
        email: userInfo.email,
        name: userInfo.name,
      });
      const data = await response.json();
      setShowPayment(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create subscription",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = () => {
    setSubscriptionComplete(true);
  };

  if (subscriptionComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Crown className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to AI Hub Pro!</h2>
              <p className="text-gray-600 mb-6">You now have unlimited access to all premium content.</p>
              <Button asChild className="w-full">
                <a href="/">Start Exploring</a>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">AI Hub Pro</h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Unlock unlimited access to premium AI content, tutorials, and expert insights
          </p>
        </div>

        {!showPayment ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center">
            {/* Features Section */}
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                What's Included in Pro
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Infinity className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Unlimited Access</h3>
                    <p className="text-gray-600">Access all premium articles, tutorials, and research papers without limits.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Offline Reading</h3>
                    <p className="text-gray-600">Download content for offline access and reading on the go.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Expert Community</h3>
                    <p className="text-gray-600">Join exclusive discussions with AI experts and fellow learners.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">$19/month</div>
                  <div className="text-blue-100">Cancel anytime • Instant access</div>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <Card className="max-w-md mx-auto w-full order-1 lg:order-2">
              <CardHeader>
                <CardTitle className="text-center">Subscribe to AI Hub Pro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <Button 
                  onClick={handleStartSubscription}
                  className="w-full"
                  size="lg"
                >
                  Subscribe Now - $19/month
                </Button>
                
                <p className="text-sm text-gray-600 text-center">
                  Instant access • Cancel anytime
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <MockPaymentForm onSuccess={handlePaymentSuccess} />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
