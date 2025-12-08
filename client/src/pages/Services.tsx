import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Our Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Complete Water Solutions
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            From installation to maintenance, we provide comprehensive water purification services.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Simple and transparent process from booking to completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Book", desc: "Schedule a service online or call us" },
              { step: "02", title: "Assess", desc: "Our technician visits for assessment" },
              { step: "03", title: "Execute", desc: "Professional service delivery" },
              { step: "04", title: "Support", desc: "Ongoing support and warranty" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary/30 mb-3">{item.step}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need a service?
          </h2>
          <p className="text-muted-foreground mb-8">
            Get in touch with us for any water purifier service requirements.
          </p>
          <Link href="/contact">
            <Button size="lg">
              Book a Service
              <i className="fa-solid fa-arrow-right ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
