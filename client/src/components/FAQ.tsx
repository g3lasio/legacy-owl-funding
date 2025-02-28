import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does credit-based investing work?",
    answer: "Our program leverages your credit score to access investment opportunities. Instead of using your own capital, we use your creditworthiness to secure funding for premium real estate projects."
  },
  {
    question: "What credit score do I need to qualify?",
    answer: "For our Legacy VIP program, we require a minimum credit score of 680. However, our Founder program is available for those working to improve their credit score."
  },
  {
    question: "How are returns distributed?",
    answer: "Returns are distributed based on your program level. Legacy VIP members receive 60% of project profits, while Legacy Executive members receive 75%. Distributions are made upon project completion."
  },
  {
    question: "What types of real estate projects do you invest in?",
    answer: "We focus on premium real estate opportunities including fix-and-flip projects, new construction developments, and multi-family properties. All projects undergo rigorous due diligence."
  },
  {
    question: "How long does it take to see returns?",
    answer: "Project timelines vary, but typically range from 6-18 months. We maintain a pipeline of projects to provide regular investment opportunities for our members."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our investment program
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
