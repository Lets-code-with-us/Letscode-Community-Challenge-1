
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your feedback. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Have questions about the Decoding Development project? Want to provide feedback or report an issue? 
            We'd love to hear from you. Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your feedback, questions, or suggestions..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                  <a href="mailto:sapfire007@outlook.com" className="text-primary hover:underline">
                    sapfire007@outlook.com
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Project Lead</h3>
                  <a href="mailto:sapfire007@outlook.com" className="text-primary hover:underline">
                    sapfire007@outlook.com
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
                  <p className="text-gray-600 text-sm">Usually within 24-48 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* Community Links */}
            <Card className="animate-scale-in" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href="https://discord.gg/VMd5bag4R5" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-3 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600 text-sm">💬</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Discord Server</div>
                    <div className="text-sm text-gray-600">Join our community chat</div>
                  </div>
                </a>

                <a href="https://discord.gg/VMd5bag4R5" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-3 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-sm">📚</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">GitHub Discussions</div>
                    <div className="text-sm text-gray-600">Technical discussions</div>
                  </div>
                </a>

                <a href="https://x.com/sapfire955" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-3 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🐦</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Twitter</div>
                    <div className="text-sm text-gray-600">@sapfire955</div>
                  </div>
                </a>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="animate-scale-in" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Data Issues?</h3>
                    <p className="text-gray-600 text-xs">Check our Resources page for data source information</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Technical Problems?</h3>
                    <p className="text-gray-600 text-xs">Visit our GitHub Issues page for bug reports</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Feature Requests?</h3>
                    <p className="text-gray-600 text-xs">Use our GitHub Discussions for suggestions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Hours */}
        <Card className="mt-12 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Office Hours & Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Community Support</h3>
                <p className="text-gray-600 text-sm mb-2">Discord & GitHub</p>
                <p className="text-xs text-gray-500">24/7 Community Help</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-2">Mon-Fri, 9 AM - 6 PM IST</p>
                <p className="text-xs text-gray-500">Response within 24-48 hours</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Live Sessions</h3>
                <p className="text-gray-600 text-sm mb-2">Weekly Office Hours</p>
                <p className="text-xs text-gray-500">Saturdays, 3 PM - 4 PM IST</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
