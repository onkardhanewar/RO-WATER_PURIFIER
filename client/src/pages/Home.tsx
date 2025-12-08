import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // todo: remove mock functionality - connect to actual backend
  const handleBuyNow = (productId: number) => {
    console.log("Buy product:", productId);
    scrollToSection("contact");
  };

  const handleServiceClick = (serviceId: number) => {
    console.log("Service clicked:", serviceId);
    scrollToSection("contact");
  };

  const handleFormSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    message: string;
  }) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={scrollToSection} />
      <Hero
        onCtaClick={() => scrollToSection("contact")}
        onLearnMoreClick={() => scrollToSection("products")}
      />
      <Products onBuyNow={handleBuyNow} />
      <Services onServiceClick={handleServiceClick} />
      <About onContactClick={() => scrollToSection("contact")} />
      <Contact onSubmit={handleFormSubmit} />
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
