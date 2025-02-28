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
          <div className="h-10">
            <svg 
              width="140" 
              height="32" 
              viewBox="0 0 140 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="h-full"
            >
              <path 
                d="M10 4H2V28H10V4Z" 
                fill={isScrolled ? "#000000" : "#FFFFFF"} 
              />
              <path 
                d="M14 4H22V28H14V4Z" 
                fill={isScrolled ? "#000000" : "#FFFFFF"} 
              />
              <path 
                d="M38 4H26V10H38V4Z" 
                fill={isScrolled ? "#000000" : "#FFFFFF"} 
              />
              <path 
                d="M26 14H34V28H26V14Z" 
                fill={isScrolled ? "#000000" : "#FFFFFF"} 
              />
              <path 
                d="M48 4H40V28H48V4Z" 
                fill={isScrolled ? "#000000" : "#FFFFFF"} 
              />
              <path 
                d="M60 4H52V28H60V4Z" 
                fill={isScrolled ? "#000000" : "#FFFFFF"} 
              />
              <path 
                d="M64 4H70L76 22H76.5L82 4H88V28H82V10H81.5L76 28H70V4Z" 
                fill={isScrolled ? "#000000" : "#FFFFFF"} 
              />
              <path 
                d="M92 4H110V10H98V13H108V19H98V22H110V28H92V4Z" 
                fill={isScrolled ? "#000000" : "#FFFFFF"} 
              />
              <path 
                d="M130 18.5C130 22.5 127 24 123 24H120V28H114V4H123C127 4 130 5.5 130 9.5C130 12 128.5 13.5 126.5 14C128.5 14.5 130 16 130 18.5ZM120 10V13H122C123 13 124 12.75 124 11.5C124 10.25 123 10 122 10H120ZM124 17C124 15.75 123 15.5 122 15.5H120V18.5H122C123 18.5 124 18.25 124 17Z" 
                fill={isScrolled ? "#000000" : "#FFFFFF"} 
              />
              <path 
                d="M134 16C134 9.5 139 3 146 3C153 3 158 9.5 158 16C158 22.5 153 29 146 29C139 29 134 22.5 134 16ZM146 23C149.5 23 152 19.75 152 16C152 12.25 149.5 9 146 9C142.5 9 140 12.25 140 16C140 19.75 142.5 23 146 23Z" 
                fill={isScrolled ? "#000000" : "#FFFFFF"} 
              />
            </svg>
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