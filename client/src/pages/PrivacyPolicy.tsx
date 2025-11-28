import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, Lock, Eye } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: November 28, 2025</p>
        </div>

        <Card>
          <CardContent className="p-8 prose dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to CalcHub ("we," "our," or "us"). We are committed to protecting your privacy and providing a safe online experience. 
              This Privacy Policy explains how we handle your information when you use our website and online calculator tools.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              <strong>Personal Data:</strong> We do not require you to register or provide personal information to use our calculators. 
              All calculations are performed locally on your device or temporarily in our system without being permanently stored.
            </p>
            <p>
              <strong>Usage Data:</strong> Like most websites, we may automatically collect non-personal information about your visit, 
              such as your browser type, operating system, referring site, and the date/time of your visit. This data helps us improve our website performance.
            </p>

            <h2>3. Cookies and Tracking</h2>
            <p>
              We use essential cookies to ensure our website functions correctly (e.g., remembering your preferences like dark mode). 
              We may also use third-party analytics tools (like Google Analytics) to understand how users interact with our site. 
              You can control cookies through your browser settings.
            </p>

            <h2>4. Data Security</h2>
            <div className="flex items-center gap-4 my-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg not-prose">
              <Lock className="h-8 w-8 text-green-500" />
              <div>
                <h4 className="font-semibold m-0 text-foreground">Your Data is Safe</h4>
                <p className="text-sm text-muted-foreground m-0">
                  Inputs you enter into our calculators (e.g., financial figures, health metrics) are processed securely and are not sold to third parties.
                </p>
              </div>
            </div>

            <h2>5. Third-Party Links</h2>
            <p>
              Our website may contain links to other websites. We are not responsible for the privacy practices or content of these third-party sites.
            </p>

            <h2>6. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last updated" date.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@calchub.com.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}