
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

// Array of luxury, investment, and professional images
const backgroundImages = [
  "https://images.unsplash.com/photo-1505843513577-22bb7d21e455", // Luxury building
  "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11", // Business meeting
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f", // Stock market/investing
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2", // Luxury interior
  "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2", // Modern business district
  "https://images.unsplash.com/photo-1571624436279-b272aff752b5", // Luxury yacht
  "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55", // Exclusive car
  "https://images.unsplash.com/photo-1604762524889-3e2fcc145683", // Investment concept
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Change image every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Image carousel background with enhanced effects */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-gradient-elegant"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1 : 1.05
            }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 6, ease: "easeInOut" }
            }}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.8)), url('${image}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
              filter: 'brightness(1.05)'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Transform Your Credit Into{" "}
            <span className="text-gradient relative">
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 h-[3px] bg-primary/40"
              />
              Premium Investment
            </span> Opportunities
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 mb-12 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Join an exclusive community of investors who leverage their credit to access premium real estate opportunities without using their own capital.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/qualify">
              <Button 
                size="lg" 
                className="text-lg font-quantico tracking-wide px-8 py-6 bg-gradient-elegant hover:brightness-110 btn-elegant shadow-lg"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
