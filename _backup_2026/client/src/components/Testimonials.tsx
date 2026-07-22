import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "John Smith",
    role: "Real Estate Investor",
    image: "https://images.unsplash.com/photo-1484981138541-3d074aa97716",
    quote: "Legacy Capital Partners has transformed my investment strategy. Their credit-based approach allowed me to access opportunities I never thought possible."
  },
  {
    name: "Sarah Johnson",
    role: "Property Developer",
    image: "https://images.unsplash.com/photo-1554774853-b415df9eeb92",
    quote: "The support and expertise from the Legacy team have been invaluable. I've seen consistent returns and grown my portfolio significantly."
  },
  {
    name: "Michael Chen",
    role: "Legacy Executive Member",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2",
    quote: "Being part of the Legacy Executive program has opened doors to exclusive deals and a network of highly successful investors."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our community of successful investors
          </p>
        </motion.div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="mx-4">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-6">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    </Avatar>
                    <blockquote className="text-lg mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
