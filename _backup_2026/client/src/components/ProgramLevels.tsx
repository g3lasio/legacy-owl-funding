import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const levels = [
  {
    name: "Legacy Founder",
    description:
      "Legacy Founders are distinguished investors who seek to build their creditworthiness as a strategic step toward gaining access to the exclusive VIP circle.",
    cost: "$799 (non refundable)",
    features: [
      "Access to starter projects",
      "Credit score between 650 - 680",
      "Credit improvement guidance",
      "Basic educational resources",
      "proffit sharing 50%",
      "Community access",
    ],
    paymentLink:
      "https://68291e54-fba5-4346-a969-e84eab277770.paylinks.godaddy.com/LegacyFounderPartner",
  },
  {
    name: "Legacy VIP",
    description: "For investors with 680+ credit score",
    cost: "$599 (refundable after first withdrawal)",
    features: [
      "Elite access to high-yield real estate projects",
      "60/40 profit-sharing model favoring investors",
      "Advanced real estate investment workshops",
      "Complimentary legal and tax structuring services",
      "Private networking events with top-tier investors",
      "Reinvestment opportunities with optimized returns",
      "Personalized investment performance dashboard",
      "Exclusive early access to new project launches",
    ],
    paymentLink:
      "https://68291e54-fba5-4346-a969-e84eab277770.paylinks.godaddy.com/LegacyCapitalVIP",
  },
  {
    name: "Legacy Executive",
    description: "For experienced investors",
    cost: "No cost, must be 16 months member on VIP",
    features: [
      "Leadership role in large-scale development projects",
      "75/25 profit-sharing model for maximum investor benefit",
      "Executive-level mentorship and advisory sessions",
      "Tailored financing solutions with preferential terms",
      "Access to proprietary market insights and analytics",
      "Invitations to private executive roundtables",
      "Comprehensive legal and tax optimization services",
      "Legacy-building recognition within the investor community",
    ],
    paymentLink: null, // Add payment link here if needed later
  },
];

export default function ProgramLevels() {
  return (
    <section className="py-20 bg-accent/5" id="programs">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Investment Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer tailored programs designed to meet your investment goals
            and credit profile.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {levels.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative h-full">
                <Card
                  className={`h-full ${index === 1 ? "border-primary shadow-lg" : ""}`}
                >
                  {index === 1 && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{level.name}</CardTitle>
                    <CardDescription className="text-base">
                      {level.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-xl font-bold">{level.cost}</div>
                    <ul className="space-y-2">
                      {level.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-3">
                    <Link href="/qualify" className="w-full">
                      <Button
                        variant={index === 1 ? "default" : "outline"}
                        className="w-full"
                      >
                        Apply Now
                      </Button>
                    </Link>

                    {level.paymentLink && (
                      <a
                        href={level.paymentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button variant="secondary" className="w-full">
                          Pay Membership
                        </Button>
                      </a>
                    )}
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
