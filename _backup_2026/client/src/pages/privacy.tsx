import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Privacy Policy
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <p className="text-muted-foreground mb-4">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              At Legacy Capital Partners ("Legacy," "we," "us," or "our"), we
              value your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website, use our services, or interact with us in any way.
            </p>
            <p>
              By accessing or using our services, you consent to the practices
              described in this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-medium mb-3">Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide
              to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Register for an account</li>
              <li>Fill out a contact form</li>
              <li>Apply for our investment programs</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>
              This information may include your name, email address, phone
              number, mailing address, financial information, and other
              information necessary to provide our services.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-6">
              Automatically Collected Information
            </h3>
            <p>
              When you visit our website, we may automatically collect certain
              information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Device information</li>
              <li>Usage data and browsing patterns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p>
              We may use the information we collect for various purposes,
              including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and managing your account</li>
              <li>
                Communicating with you about our services, updates, and
                promotions
              </li>
              <li>Responding to your inquiries and requests</li>
              <li>
                Conducting research and analysis to better understand our
                customers
              </li>
              <li>
                Protecting our rights, property, or safety, and that of our
                users
              </li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Sharing Your Information
            </h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Service providers who perform services on our behalf</li>
              <li>
                Financial institutions and partners necessary to complete
                transactions
              </li>
              <li>Legal and regulatory authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to collect
              information about your browsing activities. These technologies
              help us analyze website traffic, personalize content, and improve
              your experience.
            </p>
            <p>
              You can configure your browser to refuse cookies or alert you when
              cookies are being sent. However, some parts of our website may not
              function properly if you disable cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the Internet or electronic storage is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Accessing, correcting, or deleting your personal information
              </li>
              <li>Restricting or objecting to our use of your information</li>
              <li>Requesting a portable copy of your information</li>
              <li>
                Withdrawing consent at any time (where processing is based on
                consent)
              </li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information
              provided at the end of this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The updated
              version will be indicated by an updated "Last Updated" date and
              will be effective as soon as it is accessible. We encourage you to
              review this Privacy Policy periodically to stay informed of how we
              are protecting your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our
              privacy practices, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> info@0wlfunding.com
              <br />
              <strong>Phone:</strong> (743) 240-2088
              <br />
              <strong>Address:</strong> 2901 Owens, Fairfield, CA, 94534
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
