import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, Phone, Mail } from "lucide-react";
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
  { name: "Qualify", href: "/qualify" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Added for mobile menu

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
      <div className="bg-primary/90 text-white py-1 px-4"> {/* Added contact info section */}
        <div className="container mx-auto flex justify-end items-center text-sm">
          <a href="tel:+17432402088" className="flex items-center mr-6 hover:text-white/80 transition-colors">
            <Phone className="h-3 w-3 mr-1" />
            <span>743 240 2088</span>
          </a>
          <a href="mailto:info@0wlfunding.com" className="flex items-center hover:text-white/80 transition-colors">
            <Mail className="h-3 w-3 mr-1" />
            <span>info@0wlfunding.com</span>
          </a>
        </div>
      </div>
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto md:mx-0">
          <div className="h-16 sm:h-20 flex justify-center">
            <img
              src="https://i.postimg.cc/TPCnRjmx/cortado.png"
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
          <div className="hidden md:flex items-center gap-4"> {/* Added button section */}
            <Link href="#contact">
              <Button variant="outline" className="bg-primary/10 hover:bg-primary/20">
                Solicitar Información
              </Button>
            </Link>
            <Link href="/qualify">
              <Button size="lg" className="font-quantico tracking-wide">
                Join Now
              </Button>
            </Link>
          </div>
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
              <Link href="#contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full mb-2" variant="outline">
                  Solicitar Información
                </Button>
              </Link>
              <Link href="/qualify" onClick={() => setIsOpen(false)}>
                <Button className="w-full" variant="default">
                  Join Now
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}