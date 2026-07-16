import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0a0f1a] via-background to-primary/5">
      {/* Animated background ripples */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Paper tear/crack effect - SVG overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="crack">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
          </filter>
        </defs>
        {/* Crack lines */}
        <path d="M 0,200 Q 200,250 400,200 T 800,200 L 1000,300" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" className="animate-pulse" />
        <path d="M 200,0 L 250,400 L 300,800" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" className="animate-pulse" style={{animationDelay: '0.5s'}} />
        <path d="M 800,0 L 750,300 L 700,600" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
        <path d="M 0,600 Q 300,550 600,600 T 1200,600" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '0.3s'}} />
        
        {/* Random crack fragments */}
        <circle cx="30%" cy="20%" r="3" fill="rgba(255,255,255,0.05)" className="animate-pulse" />
        <circle cx="70%" cy="30%" r="2" fill="rgba(255,255,255,0.05)" className="animate-pulse" style={{animationDelay: '0.7s'}} />
        <circle cx="50%" cy="70%" r="2.5" fill="rgba(255,255,255,0.05)" className="animate-pulse" style={{animationDelay: '0.4s'}} />
        <circle cx="80%" cy="80%" r="3" fill="rgba(255,255,255,0.05)" className="animate-pulse" style={{animationDelay: '0.9s'}} />
      </svg>

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Water droplet animation */}
        <div className="relative w-32 h-32">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-spin-slow" />
          <div className="absolute inset-2 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          
          {/* Center water droplet */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative animate-bounce">
              {/* Main droplet */}
              <svg
                width="48"
                height="60"
                viewBox="0 0 48 60"
                fill="none"
                className="drop-shadow-2xl"
              >
                <path
                  d="M24 0C24 0 0 24 0 40C0 51.046 10.954 60 24 60C37.046 60 48 51.046 48 40C48 24 24 0 24 0Z"
                  className="fill-cyan-500/80"
                />
                <path
                  d="M24 10C24 10 10 28 10 40C10 46.627 16.373 52 24 52C31.627 52 38 46.627 38 40C38 28 24 10 24 10Z"
                  className="fill-cyan-400/40"
                />
                <ellipse
                  cx="18"
                  cy="35"
                  rx="4"
                  ry="6"
                  className="fill-white/50 animate-pulse"
                />
              </svg>
              
              {/* Ripple effect */}
              <div className="absolute -inset-6 border-2 border-cyan-400/40 rounded-full animate-ping" />
              <div className="absolute -inset-8 border border-cyan-500/20 rounded-full animate-ping" style={{animationDelay: '0.5s'}} />
            </div>
          </div>
        </div>

        {/* Brand text */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            AquaPure
          </h2>
          <p className="text-sm text-muted-foreground tracking-widest uppercase animate-pulse">
            Pure Water, Pure Life
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-500 rounded-full transition-all duration-300 ease-out animate-gradient-x shadow-lg shadow-cyan-500/50"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="text-cyan-400/80 text-sm font-medium tabular-nums">
          {Math.floor(Math.min(progress, 100))}%
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
