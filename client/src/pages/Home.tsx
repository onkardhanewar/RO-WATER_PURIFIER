import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";
import CounterAnimation from "@/components/CounterAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services, stats } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  Shield, 
  Droplet, 
  Award, 
  Clock, 
  Phone, 
  CheckCircle,
  Zap,
  Leaf,
  HeartPulse,
  Wrench
} from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  capacity: string;
  warranty: string;
  inStock: boolean;
}

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.filter((p: Product) => p.inStock).slice(0, 4));
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  const handleBuyNow = async (productId: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (response.ok) {
        const product = products.find((p) => p.id === productId);
        toast({
          title: "Added to cart",
          description: `${product?.name} has been added to your cart.`,
        });
        // Navigate to cart page to show the added product
        setTimeout(() => setLocation("/cart"), 500);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Products Preview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal animation="fade-down">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
                  Our Products
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground motion-blur-heading">
                  Premium Purifiers
                </h2>
              </div>
              <Link href="/products">
                <Button variant="outline" className="hidden sm:flex">
                  View All
                  <i className="fa-solid fa-arrow-right ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available. Add products from admin panel.</p>
            </div>
          ) : (
            <>
              {/* Mobile: Horizontal Scroll */}
              <div className="relative md:hidden">
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                  {products.map((product, index) => (
                    <ScrollReveal key={product.id} animation="scale-in" delay={index * 100}>
                      <div className="flex-none w-[280px] snap-start">
                        <ProductCard product={product} onBuyNow={handleBuyNow} />
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
              
              {/* Desktop/Tablet: Grid Layout */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ScrollReveal key={product.id} animation="scale-in" delay={index * 100}>
                    <ProductCard product={product} onBuyNow={handleBuyNow} />
                  </ScrollReveal>
                ))}
              </div>
            </>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link href="/products">
              <Button variant="outline">
                View All Products
                <i className="fa-solid fa-arrow-right ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-background to-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
                Why AquaPure
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                <span className="inline-block" style={{animation: 'motionBlurInVertical 1s ease-out'}}>
                  Your Trusted Water Partner
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We combine cutting-edge technology with exceptional service to deliver pure, healthy water to your home.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ScrollReveal animation="slide-left" delay={0}>
              <Card className="border-white/10 bg-[#0a0f1a] hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Certified Quality</h3>
                  <p className="text-gray-400">
                    All our purifiers are ISI certified and tested for Indian water conditions, ensuring the highest safety standards.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="scale-in" delay={100}>
              <Card className="border-white/10 bg-[#0a0f1a] hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Wrench className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Expert Installation</h3>
                  <p className="text-gray-400">
                    Professional installation by trained technicians, with free service for the first year.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" delay={200}>
              <Card className="border-white/10 bg-[#0a0f1a] hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Clock className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">24/7 Support</h3>
                  <p className="text-gray-400">
                    Round-the-clock customer support with same-day service response for urgent issues.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="slide-left" delay={300}>
              <Card className="border-white/10 bg-[#0a0f1a] hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Award className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Extended Warranty</h3>
                  <p className="text-gray-400">
                    Industry-leading warranty coverage with affordable extended protection plans.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="rotate-in" delay={400}>
              <Card className="border-white/10 bg-[#0a0f1a] hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Leaf className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Eco-Friendly</h3>
                  <p className="text-gray-400">
                    Energy-efficient systems that reduce water wastage and minimize environmental impact.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" delay={500}>
              <Card className="border-white/10 bg-[#0a0f1a] hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <HeartPulse className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Health First</h3>
                  <p className="text-gray-400">
                    Advanced purification removes 99.9% of harmful contaminants while retaining essential minerals.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Water Purification Process */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
                <span className="text-fade-in" style={{animationDelay: '0ms'}}>O</span>
                <span className="text-fade-in" style={{animationDelay: '50ms'}}>u</span>
                <span className="text-fade-in" style={{animationDelay: '100ms'}}>r</span>
                <span className="text-fade-in" style={{animationDelay: '150ms'}}> </span>
                <span className="text-fade-in" style={{animationDelay: '200ms'}}>T</span>
                <span className="text-fade-in" style={{animationDelay: '250ms'}}>e</span>
                <span className="text-fade-in" style={{animationDelay: '300ms'}}>c</span>
                <span className="text-fade-in" style={{animationDelay: '350ms'}}>h</span>
                <span className="text-fade-in" style={{animationDelay: '400ms'}}>n</span>
                <span className="text-fade-in" style={{animationDelay: '450ms'}}>o</span>
                <span className="text-fade-in" style={{animationDelay: '500ms'}}>l</span>
                <span className="text-fade-in" style={{animationDelay: '550ms'}}>o</span>
                <span className="text-fade-in" style={{animationDelay: '600ms'}}>g</span>
                <span className="text-fade-in" style={{animationDelay: '650ms'}}>y</span>
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                <span className="inline-block" style={{animation: 'motionBlurIn 1.2s ease-out'}}>
                  Multi-Stage Purification Process
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the power of advanced RO technology combined with UV sterilization for the purest water.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Pre-Filtration",
                description: "Removes sediment, dirt, and visible impurities",
                icon: Droplet,
              },
              {
                step: "02",
                title: "RO Membrane",
                description: "Eliminates dissolved salts, heavy metals, and bacteria",
                icon: Shield,
              },
              {
                step: "03",
                title: "UV Sterilization",
                description: "Destroys remaining microorganisms and viruses",
                icon: Zap,
              },
              {
                step: "04",
                title: "Mineral Enhancement",
                description: "Adds back essential minerals for health benefits",
                icon: HeartPulse,
              },
            ].map((stage, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 150}>
              <div key={index} className="relative">
                <Card className="border-white/10 bg-gradient-to-br from-[#0a0f1a] to-primary/5 h-full">
                  <CardContent className="p-6">
                    <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
                      Step {stage.step}
                    </Badge>
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <stage.icon className="w-6 h-6 text-primary animate-icon-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{stage.title}</h3>
                    <p className="text-gray-400 text-sm">{stage.description}</p>
                  </CardContent>
                </Card>
                {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Water Solutions
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From installation to maintenance, we provide end-to-end water purification services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services">
              <Button variant="outline">
                Explore Services
                <i className="fa-solid fa-arrow-right ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-purple-600/10 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} animation="rotate-in" delay={index * 100}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-2">
                    <CounterAnimation 
                      end={stat.value} 
                      duration={2000}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal animation="scale-in">
            <div className="text-center mb-16">
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
                Testimonials
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                <span className="inline-block" style={{animation: 'motionBlurInVertical 1s ease-out'}}>
                  What Our Customers Say
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh Kumar",
                location: "Mumbai",
                text: "Excellent service! The water quality has improved drastically. The installation was smooth and the team was very professional.",
                rating: 5,
              },
              {
                name: "Priya Sharma",
                location: "Delhi",
                text: "Best investment for our family's health. The RO system works perfectly and the maintenance service is prompt.",
                rating: 5,
              },
              {
                name: "Amit Patel",
                location: "Bangalore",
                text: "Outstanding quality and great customer support. They responded quickly to our queries and resolved everything efficiently.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <ScrollReveal key={index} animation={index % 2 === 0 ? "slide-left" : "slide-right"} delay={index * 150}>
                <Card className="border-white/10 bg-[#0a0f1a] hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-yellow-500 text-sm" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-gray-400 text-xs">{testimonial.location}</p>
                    </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-card/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, text: "ISI Certified" },
              { icon: Shield, text: "BIS Approved" },
              { icon: Award, text: "ISO Certified" },
              { icon: HeartPulse, text: "NSF Tested" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-3 hover-icon-scale">
                  <item.icon className="w-8 h-8 text-primary animate-icon-glow" />
                </div>
                <p className="text-white font-semibold text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <Card className="border-white/10 bg-gradient-to-br from-primary/20 via-[#0a0f1a] to-purple-600/20 overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
                  Limited Time Offer
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Get Free Installation & 1 Year Service
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Book your RO water purifier today and enjoy free professional installation plus complimentary maintenance for one full year.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link href="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                      <Phone className="w-5 h-5 mr-2" />
                      Get Free Consultation
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      View Products
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Free Water Test</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>No Hidden Charges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>EMI Available</span>
                  </div>
                </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
