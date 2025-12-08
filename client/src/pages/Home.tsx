import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { products, services, stats } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Products Preview */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
                Our Products
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

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

      {/* Services Preview */}
      <section className="py-24 bg-card/30">
        <div className="max-w-6xl mx-auto px-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <section className="py-20 bg-background border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Get a free water quality test and consultation from our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                Get Free Consultation
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
