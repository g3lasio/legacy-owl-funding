import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Shield, Users } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "No Capital Required",
    description: "Access premium real estate investments using your credit score instead of cash."
  },
  {
    icon: TrendingUp,
    title: "High Returns",
    description: "Participate in carefully selected projects with significant profit potential."
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Our expert team conducts thorough due diligence on all investment opportunities."
  },
  {
    icon: Users,
    title: "Expert Network",
    description: "Join a community of successful investors and industry professionals."
  }
];

export default function ValueProposition() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Legacy Capital Partners?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We help investors like you access premium real estate opportunities through our innovative credit-based investment program.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
