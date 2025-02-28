import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const levels = [
  {
    name: "Legacy Founder",
    description: "For investors building their credit profile",
    cost: "$799 (non refundable)",
    features: [
      "Access to starter projects",
      "Credit score between 650 - 680",
      "Credit improvement guidance",
      "Basic educational resources",
      "proffit sharing 50%",
      "Community access"
    ]
  },
  {
    name: "Legacy VIP",
    description: "For investors with 680+ credit score",
    cost: "$599 (refundable after first withdrawal)",
    features: [
      "Premium project access",
      "60/40 profit sharing",
      "Advanced education",
      "Priority support",
      "Networking events"
    ]
  },
  {
    name: "Legacy Executive",
    description: "For experienced investors",
    cost: "No cost, must be 16 months member on VIP",
    features: [
      "Large-scale projects",
      "75/25 profit sharing",
      "Executive mentorship",
      "Direct deal sourcing",
      "Private investment opportunities",
      "Exclusive events"
    ]
  }
];

export default function ProgramLevels() {
  return (
    <section id="program" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Investment Program Levels
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the program level that matches your investment goals and experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {levels.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Check className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{level.name}</h3>
                  <p className="text-muted-foreground">{level.description}</p>
                  <div className="mt-4 text-xl font-bold text-primary">{level.cost}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-6">
                    {level.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mt-6">
                    <Button size="lg" className="w-full">JOIN NOW</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
