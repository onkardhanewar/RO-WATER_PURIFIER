import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onNavigate?: (section: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    onNavigate?.(section);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Home", section: "home" },
    { label: "Products", section: "products" },
    { label: "Services", section: "services" },
    { label: "About", section: "about" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-droplet text-2xl text-primary" />
            <span className="text-xl font-bold text-foreground">
              Aqua<span className="text-primary">Pure</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                data-testid={`nav-${item.section}`}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick("contact")}
              data-testid="nav-cta"
            >
              Get a Quote
            </Button>
          </div>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"} text-xl`} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border py-4"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  data-testid={`mobile-nav-${item.section}`}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium py-2 px-4 text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                <Button
                  onClick={() => handleNavClick("contact")}
                  className="w-full"
                  data-testid="mobile-nav-cta"
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
