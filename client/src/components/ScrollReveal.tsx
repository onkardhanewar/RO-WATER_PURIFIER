import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-down" | "slide-left" | "slide-right" | "scale-in" | "rotate-in" | "flip-in" | "motion-blur" | "motion-blur-vertical";
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  animation = "fade-up", 
  delay = 0,
  className = ""
}: ScrollRevealProps) {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div
      ref={elementRef}
      className={`animate-on-scroll ${isVisible ? `animated ${animation}` : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
