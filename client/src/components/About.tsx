interface AboutProps {
  onContactClick?: () => void;
}

const highlights = [
  "15+ Years of Industry Experience",
  "50,000+ Satisfied Customers",
  "100% Genuine Products & Parts",
  "24/7 Customer Support",
  "Certified & Trained Technicians",
  "Eco-Friendly Water Solutions",
];

export default function About({ onContactClick }: AboutProps) {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-16 md:py-24 lg:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="about-title">
              About <span className="text-primary">AquaPure</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed" data-testid="about-story">
              Since 2008, AquaPure has been at the forefront of water purification technology in India. 
              We started with a simple mission: to provide every household with access to clean, safe, 
              and healthy drinking water.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Today, we are proud to serve over 50,000 families across the nation with our 
              state-of-the-art RO water purifiers and dedicated service network. Our commitment 
              to quality and customer satisfaction remains unchanged.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary" data-testid="stat-years">
                  15+
                </div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary" data-testid="stat-customers">
                  50K+
                </div>
                <div className="text-sm text-muted-foreground">Customers</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary" data-testid="stat-cities">
                  100+
                </div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 md:p-8 border border-card-border">
            <h3 className="text-xl font-semibold text-foreground mb-6" data-testid="why-choose-title">
              Why Choose Us?
            </h3>
            <ul className="space-y-4">
              {highlights.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3"
                  data-testid={`highlight-${index}`}
                >
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
  );
}
