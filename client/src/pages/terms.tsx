
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfService() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to Legacy Capital Partners. These Terms of Service ("Terms") govern your access to and use of our website, platform, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
            </p>
            <p>
              Please read these Terms carefully. If you do not agree with these Terms, you may not access or use our Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
            <p className="mb-4">
              To use our Services, you must be at least 18 years old and capable of forming a binding contract with Legacy Capital Partners. You represent and warrant that you meet all eligibility requirements.
            </p>
            <p>
              Some of our investment opportunities may have additional eligibility requirements, such as minimum credit scores or investor qualifications. These requirements will be specified for each opportunity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
            <p className="mb-4">
              To access certain features of our Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p className="mb-4">
              You are responsible for safeguarding your account credentials and for any activity under your account. Notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>
            <p>
              We reserve the right to refuse service, terminate accounts, or remove content at our discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Investment Opportunities</h2>
            <p className="mb-4">
              Our platform offers various real estate investment opportunities. All investments involve risk, including the potential loss of principal.
            </p>
            <p className="mb-4">
              The information we provide about investment opportunities is for informational purposes only and should not be considered investment advice. We recommend consulting with a financial advisor before making any investment decisions.
            </p>
            <p>
              Past performance is not indicative of future results. Returns are not guaranteed, and the value of investments may fluctuate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. User Conduct</h2>
            <p className="mb-4">
              You agree not to use our Services to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Violate any applicable law or regulation</li>
              <li>Infringe on the rights of others</li>
              <li>Submit false or misleading information</li>
              <li>Engage in unauthorized advertising or solicitation</li>
              <li>Disrupt the functioning of our Services</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Transmit malware, viruses, or other harmful code</li>
            </ul>
            <p>
              We reserve the right to terminate your access to our Services for violations of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              Our Services and their contents, including but not limited to text, graphics, logos, icons, images, and software, are the property of Legacy Capital Partners or our licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not copy, modify, distribute, sell, or lease any part of our Services without our prior written consent. You also may not reverse engineer or attempt to extract the source code of our software unless applicable laws prohibit these restrictions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links and Services</h2>
            <p className="mb-4">
              Our Services may contain links to third-party websites or services that are not owned or controlled by Legacy Capital Partners. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p>
              Your use of such websites and services is at your own risk and subject to the terms and conditions of those websites and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
            <p className="mb-4">
              OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              WE DO NOT GUARANTEE THAT OUR SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEGACY CAPITAL PARTNERS AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING, BUT NOT LIMITED TO, LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR YOUR USE OF OUR SERVICES.
            </p>
            <p>
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY YOU TO US DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Legacy Capital Partners and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable attorneys' fees, arising out of or in any way connected with your access to or use of our Services, your violation of these Terms, or your violation of any rights of another.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Modifications to the Terms</h2>
            <p>
              We may modify these Terms at any time. The updated version will be effective as soon as it is accessible. We encourage you to review these Terms periodically. Your continued use of our Services after the effective date of the modified Terms constitutes your acceptance of those modifications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the state of California, without regard to its conflict of law provisions. Any legal action or proceeding relating to these Terms shall be brought exclusively in the federal or state courts located in California.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
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
