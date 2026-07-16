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
      className="group cursor-pointer border-0 bg-card/50 backdrop-blur transition-all duration-500 hover:bg-card overflow-visible h-full"
      onClick={onClick}
    >
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 transition-colors group-hover:bg-primary/20">
          <i className={`${service.icon} text-lg sm:text-xl md:text-2xl text-primary`} />
        </div>
        <h3
          className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-2 sm:mb-3 line-clamp-2"
          data-testid={`service-title-${service.id}`}
        >
          {service.title}
        </h3>
        <p
          className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-none"
          data-testid={`service-description-${service.id}`}
        >
          {service.description}
        </p>
        {service.features && service.features.length > 0 && (
          <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 hidden sm:block">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
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
