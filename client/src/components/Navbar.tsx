import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, GitCompare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    loadCartCount();
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  const loadCartCount = async () => {
    try {
      const response = await fetch("/api/cart", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCartCount(data.length);
      }
    } catch (error) {
      console.error("Failed to load cart count:", error);
    }
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Services", path: "/services" },
    { label: "Book Service", path: "/service-booking" },
    { label: "About", path: "/about" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "md:bg-transparent bg-background/80 backdrop-blur-xl border-b md:border-0 border-border/50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img 
                src="/assets/images/logo.png" 
                alt="AquaPure Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
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

          <div className="hidden md:flex items-center gap-4">
            <Link href="/compare">
              <Button
                size="icon"
                variant="ghost"
                className="relative text-muted-foreground hover:text-foreground hover-icon-scale"
              >
                <GitCompare className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button
                size="icon"
                variant="ghost"
                className="relative text-muted-foreground hover:text-foreground hover-icon-bounce"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-orange-600">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link href="/contact">
              <Button size="sm" data-testid="nav-cta">
                Contact
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-foreground p-2 hover-icon-wiggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
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
            
            <div className="flex gap-2 mt-2 px-2">
              <Link href="/compare">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover-icon-scale"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <GitCompare className="w-4 h-4 mr-2" />
                  Compare
                </Button>
              </Link>
              
              <Link href="/cart">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 relative hover-icon-bounce"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {cartCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-orange-600">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>

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
