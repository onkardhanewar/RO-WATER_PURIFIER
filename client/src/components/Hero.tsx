import { Button } from "@/components/ui/button";

interface HeroProps {
  onCtaClick?: () => void;
  onLearnMoreClick?: () => void;
}

export default function Hero({ onCtaClick, onLearnMoreClick }: HeroProps) {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="hero-video"
      >
        <source
          src="https://cdn.pixabay.com/video/2020/07/30/45875-447087857_large.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        <div className="animate-fade-in">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            data-testid="hero-title"
          >
            Pure Water, <span className="text-primary">Pure Life</span>
          </h1>
          <p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
            data-testid="hero-subtitle"
          >
            Experience the difference with our advanced RO water purification
            systems. Premium quality, professional installation, and dedicated
            service for your home and business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={onCtaClick}
              data-testid="hero-cta-primary"
              className="text-lg px-8"
            >
              <i className="fa-solid fa-phone mr-2" />
              Get Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onLearnMoreClick}
              data-testid="hero-cta-secondary"
              className="text-lg px-8 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
            >
              <i className="fa-solid fa-play mr-2" />
              Explore Products
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="fa-solid fa-chevron-down text-white/60 text-2xl" />
        </div>
      </div>
    </section>
  );
}
