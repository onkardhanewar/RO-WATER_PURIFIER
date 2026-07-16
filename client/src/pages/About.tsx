import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { stats, highlights } from "@/lib/data";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Story
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Dedicated to providing clean, safe drinking water to every household since 2008.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Pioneering Water Purification
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  AquaPure was founded with a simple mission: to provide every Indian household 
                  access to clean, safe, and healthy drinking water. What started as a small 
                  operation has grown into one of the most trusted names in water purification.
                </p>
                <p>
                  Today, we serve over 50,000 families across 100+ cities with our state-of-the-art 
                  RO water purifiers and dedicated service network. Our commitment to quality, 
                  innovation, and customer satisfaction remains at the core of everything we do.
                </p>
                <p>
                  With a team of certified technicians and round-the-clock support, we ensure 
                  that pure water is never out of reach for our customers.
                </p>
              </div>
            </div>
            <div className="bg-card/50 rounded-2xl p-8 border border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-6">Why Choose Us</h3>
              <ul className="space-y-4">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-check text-primary text-sm" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-card/30 border-y border-border/50">
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

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "fa-solid fa-heart", title: "Customer First", desc: "Your satisfaction is our top priority. We go above and beyond to ensure you have the best experience." },
              { icon: "fa-solid fa-lightbulb", title: "Innovation", desc: "We constantly invest in R&D to bring you the most advanced water purification technology." },
              { icon: "fa-solid fa-leaf", title: "Sustainability", desc: "Our eco-friendly products and practices minimize environmental impact while maximizing purity." },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <i className={`${value.icon} text-2xl text-primary animate-icon-pulse`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background border-t border-border/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Join the AquaPure family
          </h2>
          <p className="text-muted-foreground mb-8">
            Experience the difference of truly pure water.
          </p>
          <Link href="/contact">
            <Button size="lg">
              Contact Us
              <i className="fa-solid fa-arrow-right ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
