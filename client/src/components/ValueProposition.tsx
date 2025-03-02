import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Shield, Users } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "No Capital Required",
    description:
      "Imagine investing in high-performing real estate projects without spending your own money. At Legacy, your credit score becomes your greatest asset. With a solid rating, you unlock premium opportunities usually reserved for large investors. Here, your credit works as your personal goldmine—no capital needed, just your financial credibility.",
  },
  {
    icon: TrendingUp,
    title: "High Returns",
    description:
      "Legacy drives high returns through diversified real estate investments. Our strategy blends fast cash flow from fix-and-flips, long-term growth from developments, and lucrative opportunities from tax liens and deeds, all executed via strategic joint ventures. This balanced approach minimizes risk while maximizing profit, ensuring steady growth for your investment.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "Our expert team rigorously evaluates every opportunity using advanced analytics and meticulous due diligence to ensure only secure, high-yield investments are approved. This robust risk management approach safeguards your capital, minimizes exposure, and maximizes potential returns.",
  },
  {
    icon: Users,
    title: "Expert Network",
    description:
      "Join a community of successful investors and industry professionals, backed by a dedicated legal team managing contracts and documentation, rigorous audits by seasoned CPAs, and insightful financial analysts who ensure transparency and drive high-yield, profitable investment opportunities.",
  },
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
            We help investors like you access premium real estate opportunities
            through our innovative credit-based investment program.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Card className="h-full border-primary/10 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 hover:translate-y-[-5px]">
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                  <motion.div
                    className="mb-6 p-4 bg-primary/10 rounded-full"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(32, 129, 226, 0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
