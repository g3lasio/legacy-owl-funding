
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
      {/* Image carousel background */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-elegant transition-opacity duration-1000"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${backgroundImages[currentImageIndex]}')`,
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
            <Link href="/qualify">
              <Button 
                size="lg" 
                className="text-lg font-quantico tracking-wide px-8 py-6 bg-gradient-elegant hover:brightness-110"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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
