import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Users, MapPin, CreditCard, Mail, Shield, Globe, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About WayFare",
  description: "Discover destinations, create trips, and embark on adventures with like-minded explorers.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            About <span className="text-blue-600">WayFare</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Connecting travelers with unforgettable journeys. Discover destinations, create trips, and embark on adventures with like-minded explorers.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How WayFare Works</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-slate-200 hover:border-blue-300 hover:scale-105 transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Discover Destinations</CardTitle>
                <CardDescription>Browse through our curated list of amazing destinations worldwide</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 hover:scale-105 transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Create or Join Trips</CardTitle>
                <CardDescription>Create your own trip itinerary or join existing ones created by other travelers</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 hover:scale-105 transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Secure Payment</CardTitle>
                <CardDescription>Secure booking with Stripe payment processing</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 hover:scale-105 transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Receive Invoice</CardTitle>
                <CardDescription>Get instant email confirmation and detailed invoice after payment</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 hover:scale-105 transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Connect & Travel</CardTitle>
                <CardDescription>Meet fellow travelers and embark on shared adventures</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 hover:scale-105 transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Dashboard Management</CardTitle>
                <CardDescription>Track activities through personalized user and admin dashboards</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Separator className="my-12" />

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">For Travelers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Create custom trips with your preferred itinerary</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Join trips created by other travelers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Secure payment processing via Stripe</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Personal dashboard to track all your activities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Automated invoice delivery to your email</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">For Administrators</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Comprehensive admin dashboard</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Monitor all trip activities and payments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Manage destinations and user accounts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Track payment processing and invoices</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Ensure platform security and smooth operation</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Payment & Security Section */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Secure & Reliable</CardTitle>
              <CardDescription>Your safety and security are our top priorities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Stripe Integration</h4>
                  <p className="text-sm text-slate-600">Industry-leading payment processing for secure transactions</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Instant Invoices</h4>
                  <p className="text-sm text-slate-600">Automated invoice delivery with detailed payment breakdown</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Data Protection</h4>
                  <p className="text-sm text-slate-600">Your personal and payment information is securely protected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to Start Your Journey?</h3>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">Join thousands of travelers who have discovered new destinations and made lasting memories through WayFare.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/destinations">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Explore Destinations
                </Button>
              </Link>
              <Link href="/trips">
                <Button size="lg" variant="outline">
                  Explore Trip
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
