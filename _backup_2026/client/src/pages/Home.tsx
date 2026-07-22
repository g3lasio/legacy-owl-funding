import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import ProgramLevels from "@/components/ProgramLevels";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <ValueProposition />
        <ProgramLevels />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
    </div>
  );
}
