import { Card, CardContent } from "@/components/ui/card";

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  features?: string[];
}

interface ServiceCardProps {
  service: Service;
  onClick?: () => void;
}

export default function ServiceCard({ service, onClick }: ServiceCardProps) {
  return (
    <Card
      data-testid={`service-card-${service.id}`}
      className="group cursor-pointer border-0 bg-card/50 backdrop-blur transition-all duration-500 hover:bg-card overflow-visible"
      onClick={onClick}
    >
      <CardContent className="p-8">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-colors group-hover:bg-primary/20">
          <i className={`${service.icon} text-2xl text-primary`} />
        </div>
        <h3
          className="text-xl font-semibold text-foreground mb-3"
          data-testid={`service-title-${service.id}`}
        >
          {service.title}
        </h3>
        <p
          className="text-muted-foreground leading-relaxed"
          data-testid={`service-description-${service.id}`}
        >
          {service.description}
        </p>
        {service.features && service.features.length > 0 && (
          <ul className="mt-4 space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                <i className="fa-solid fa-check text-primary text-xs" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
