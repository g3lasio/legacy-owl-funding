import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Program", href: "#program" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-12 sm:h-14">
            <img 
              src={isScrolled ? "https://i.postimg.cc/qMfTDQtz/oficial.png" : "https://i.postimg.cc/qMfTDQtz/oficial.png"} 
              alt="Legacy Capital Logo" 
              className="h-full"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-quantico text-foreground/80 hover:text-primary transition-colors tracking-wide"
            >
              {item.name}
            </a>
          ))}
          <Button size="lg" className="font-quantico tracking-wide">
            Join Now
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-quantico text-foreground/80 hover:text-primary transition-colors tracking-wide text-lg"
                >
                  {item.name}
                </a>
              ))}
              <Button size="lg" className="font-quantico tracking-wide mt-4">
                Join Now
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}