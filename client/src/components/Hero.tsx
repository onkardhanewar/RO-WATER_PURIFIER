import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center"
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

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-6 animate-fade-in">
          Premium Water Purification
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight animate-fade-in"
          style={{ animationDelay: "0.1s" }}
          data-testid="hero-title"
        >
          Pure water.
          <br />
          <span className="text-primary">Pure life.</span>
        </h1>
        <p
          className="text-lg text-white/70 max-w-xl mx-auto mb-10 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
          data-testid="hero-subtitle"
        >
          Advanced RO technology for homes and businesses. Experience the difference of truly clean water.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Link href="/products">
            <Button size="lg" data-testid="hero-cta-primary" className="min-w-40">
              View Products
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              data-testid="hero-cta-secondary"
              className="min-w-40 bg-white/5 backdrop-blur border-white/20 text-white hover:bg-white/10"
            >
              Get Quote
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
