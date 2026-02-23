import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Terms() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: February 23, 2026</p>
        </div>

        <Card>
          <CardContent className="p-8 prose dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using CalcSmart24.com ("the Website", "we", "us", or "our"), you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by these terms, please do not use this website.
            </p>

            <h2>2. Educational and Informational Purposes Only</h2>
            <p>
              The calculators, tools, and content provided on CalcSmart24 are for <strong>educational and informational purposes only</strong>. 
            </p>
            <ul>
              <li><strong>Financial Tools:</strong> Our financial calculators (e.g., mortgage, loan, tax) provide estimates based on the data you input. They do not constitute financial, investment, or legal advice. You should consult a qualified financial advisor before making any major financial decisions.</li>
              <li><strong>Health & Fitness Tools:</strong> Our health calculators (e.g., BMI, Calorie, Body Fat) are generic mathematical models. They do not constitute medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions regarding a medical condition.</li>
            </ul>

            <h2>3. Accuracy of Information</h2>
            <p>
              While we strive to ensure that the mathematical formulas and algorithms used in our calculators are accurate, we make no guarantees, warranties, or representations regarding the absolute accuracy, reliability, or completeness of the results provided by the Website. 
              The Website and its tools are provided on an "as is" and "as available" basis.
            </p>

            <h2>4. Use of the Website</h2>
            <p>You agree to use the Website only for lawful purposes. You agree not to take any action that might compromise the security of the Website, render the Website inaccessible to others, or otherwise cause damage to the Website or its content.</p>

            <h2>5. Intellectual Property</h2>
            <p>
              The design, layout, graphics, content, and code of the Website are owned by or licensed to CalcSmart24. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall CalcSmart24, its owners, developers, or affiliates be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your access or use of or inability to access or use the Website and its tools. 
              This includes, but is not limited to, reliance on any information obtained from the Website, or that results from mistakes, omissions, interruptions, or any failure of performance.
            </p>

            <h2>7. Links to Third-Party Websites</h2>
            <p>
              The Website may contain links to external websites that are not provided or maintained by or in any way affiliated with CalcSmart24. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
            </p>

            <h2>8. Modifications to Terms</h2>
            <p>
              We reserve the right to revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms and Conditions of Use.
            </p>

            <h2>9. Contact Information</h2>
            <p>
              If you have any questions or concerns regarding these Terms of Service, please contact us at <a href="mailto:support@calcsmart24.com">support@calcsmart24.com</a>.
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