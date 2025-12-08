import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <span className="text-xl font-semibold tracking-tight text-foreground cursor-pointer">
              aqua<span className="text-primary">pure</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  data-testid={`nav-${item.label.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/contact">
              <Button size="sm" data-testid="nav-cta">
                Contact
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-80 pb-6" : "max-h-0"
          }`}
          data-testid="mobile-menu"
        >
          <div className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                  className={`block py-3 px-2 text-sm font-medium transition-colors cursor-pointer rounded-lg ${
                    isActive(item.path)
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button className="w-full mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
