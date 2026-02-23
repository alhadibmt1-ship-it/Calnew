import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-12 py-8 px-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question, feedback, or a suggestion for a new calculator? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <Card className="bg-slate-50 dark:bg-slate-900/50 border-0 shadow-sm h-full">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="font-semibold text-lg mb-6">Get in Touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2.5 rounded-lg text-primary shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a href="mailto:support@calcsmart24.com" className="text-muted-foreground hover:text-primary transition-colors">
                          support@calcsmart24.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2.5 rounded-lg text-primary shrink-0">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Support Hours</p>
                        <p className="text-muted-foreground">Monday - Friday<br/>9:00 AM - 5:00 PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2.5 rounded-lg text-primary shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Location</p>
                        <p className="text-muted-foreground">Digital First Company<br/>Available Worldwide</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t">
                  <h4 className="font-medium mb-3">Looking for a specific tool?</h4>
                  <Link href="/">
                    <Button variant="outline" className="w-full">Browse Calculators</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border shadow-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <select 
                    id="subject" 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="" disabled selected>Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="bug">Report a Bug/Error</option>
                    <option value="suggestion">Suggest a New Calculator</option>
                    <option value="business">Business Partnership</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you today?" 
                    className="min-h-[150px] resize-y" 
                    required 
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full sm:w-auto px-8">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
