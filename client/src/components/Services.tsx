import { Card, CardContent } from "@/components/ui/card";

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

// todo: remove mock functionality
const services: Service[] = [
  {
    id: 1,
    icon: "fa-solid fa-tools",
    title: "Installation",
    description: "Professional installation by certified technicians. Free site assessment and same-day service available.",
  },
  {
    id: 2,
    icon: "fa-solid fa-file-contract",
    title: "AMC Plans",
    description: "Comprehensive annual maintenance contracts with scheduled servicing, filter replacements, and priority support.",
  },
  {
    id: 3,
    icon: "fa-solid fa-wrench",
    title: "Repairs & Maintenance",
    description: "Expert repair services with genuine spare parts. Quick turnaround time with 90-day service warranty.",
  },
  {
    id: 4,
    icon: "fa-solid fa-flask",
    title: "Water Testing",
    description: "Free TDS testing and water quality analysis. Get detailed reports and purification recommendations.",
  },
];

interface ServicesProps {
  onServiceClick?: (serviceId: number) => void;
}

export default function Services({ onServiceClick }: ServicesProps) {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="py-16 md:py-24 lg:py-32 bg-card"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="services-title">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete water purification solutions from installation to maintenance. We've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              data-testid={`service-card-${service.id}`}
              className="group cursor-pointer transition-transform duration-300 hover:-translate-y-2 overflow-visible bg-background"
              onClick={() => onServiceClick?.(service.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                  <i className={`${service.icon} text-3xl text-primary`} />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground mb-3"
                  data-testid={`service-title-${service.id}`}
                >
                  {service.title}
                </h3>
                <p
                  className="text-muted-foreground text-sm leading-relaxed"
                  data-testid={`service-description-${service.id}`}
                >
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
