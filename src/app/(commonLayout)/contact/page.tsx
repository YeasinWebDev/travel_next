"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare,
  CheckCircle,
  Loader2
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call (in a real app, you would make a fetch or axios call here)
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success toast
      toast.success("Message sent successfully!");

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Form submission error:', error);
      
      // Error toast
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Contact <span className="text-blue-600">WayFare</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            We're here to help! Reach out to our team for support, questions about your trips, 
            or partnership opportunities.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-slate-200 hover:border-blue-300 hover:scale-105 transition-all">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Email Us</CardTitle>
                <CardDescription>For general inquiries</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <a 
                  href="mailto:support@wayfare.com" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  support@wayfare.com
                </a>
                <p className="text-sm text-slate-500 mt-2">Typically responds within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 hover:scale-105 transition-all">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Call Us</CardTitle>
                <CardDescription>For urgent matters</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <a 
                  href="tel:+18005551234" 
                  className="text-blue-600 hover:text-blue-800 font-medium text-xl"
                >
                  +1 (800) 555-1234
                </a>
                <p className="text-sm text-slate-500 mt-2">Mon-Fri, 9AM-6PM EST</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 hover:scale-105 transition-all">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Visit Us</CardTitle>
                <CardDescription>Our headquarters</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-700 font-medium">
                  123 Travel Street<br />
                  San Francisco, CA 94107
                </p>
                <p className="text-sm text-slate-500 mt-2">By appointment only</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <Card className="border-slate-200 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                        First Name *
                      </label>
                      <Input 
                        id="firstName" 
                        placeholder="John" 
                        required 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="focus:border-blue-500 disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                        Last Name *
                      </label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe" 
                        required 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="focus:border-blue-500 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Email Address *
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="focus:border-blue-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-700">
                      Subject *
                    </label>
                    <select 
                      id="subject" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:opacity-50"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="trip-inquiry">Trip Inquiry</option>
                      <option value="booking-help">Booking Help</option>
                      <option value="payment-issue">Payment Issue</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700">
                      Message *
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you today?" 
                      rows={6}
                      required 
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="focus:border-blue-500 resize-none disabled:opacity-50"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ & Support */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                <div className="border border-slate-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <h4 className="font-semibold text-slate-900 mb-2">How do I cancel or modify a trip?</h4>
                  <p className="text-slate-600">
                    You can cancel or modify your trip from your dashboard up to 48 hours before departure. 
                    For immediate assistance, contact our support team.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <h4 className="font-semibold text-slate-900 mb-2">What payment methods do you accept?</h4>
                  <p className="text-slate-600">
                    We accept all major credit cards (Visa, Mastercard, American Express) and debit cards 
                    through our secure Stripe payment processing.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <h4 className="font-semibold text-slate-900 mb-2">How do I get my invoice?</h4>
                  <p className="text-slate-600">
                    Invoices are automatically sent to your email after successful payment. You can also 
                    download them from your dashboard anytime.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <h4 className="font-semibold text-slate-900 mb-2">Is my payment information secure?</h4>
                  <p className="text-slate-600">
                    Yes! We use Stripe, an industry-leading payment processor with bank-level security. 
                    We never store your full payment details on our servers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <Card className="max-w-7xl mx-auto border-blue-200 bg-blue-50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Our support team is dedicated to helping you have the best travel experience possible. 
                Don't hesitate to reach out!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    window.location.href = 'tel:+18005551234';
                  }}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Support Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => {
                    window.location.href = 'mailto:support@wayfare.com';
                  }}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Email Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}