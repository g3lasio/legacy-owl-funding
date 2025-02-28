import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div 
        className="absolute inset-0 z-0 bg-gradient-elegant"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1505843513577-22bb7d21e455')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-wide">
            Transform Your Credit Into{" "}
            <span className="text-gradient">Premium Investment</span> Opportunities
          </h1>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Join an exclusive community of investors who leverage their credit to access premium real estate opportunities without using their own capital.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button size="lg" className="text-lg font-quantico tracking-wide px-8 py-6 bg-gradient-elegant hover:brightness-110">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg font-quantico tracking-wide px-8 py-6 text-white border-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}