import { useState, useEffect } from "react";

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Show icon after hero section loads (delay for reveal effect)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2 second delay after page load

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsAnimating(true);
    // Redirect to WhatsApp chat - update with your WhatsApp number
    const phoneNumber = "918208836372"; // Replace with your WhatsApp number
    const message = "Hi! I'm interested in your RO water purifiers.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    
    // Reset animation after click
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ${
      isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-50"
    }`}>
      {/* Pulse rings */}
      <div className="absolute inset-0 animate-ping">
        <div className="w-16 h-16 rounded-full bg-green-500 opacity-20"></div>
      </div>
      
      <div className="absolute inset-0">
        <div className="w-16 h-16 rounded-full bg-green-500 opacity-10 animate-pulse"></div>
      </div>
      
      {/* Main floating button */}
      <button
        onClick={handleClick}
        className={`relative w-16 h-16 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 whatsapp-float group ${
          isAnimating ? "animate-bounce" : ""
        }`}
        title="Chat with us on WhatsApp"
        aria-label="Open WhatsApp chat"
      >
        {/* WhatsApp Logo SVG with Animations */}
        <svg
          viewBox="0 0 175.216 175.552"
          className="w-10 h-10 whatsapp-icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="whatsapp-gradient"
              x1="85.915"
              x2="86.535"
              y1="32.567"
              y2="137.092"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#57d163" />
              <stop offset="1" stopColor="#23b33a" />
            </linearGradient>
          </defs>
          <path
            className="whatsapp-circle"
            fill="url(#whatsapp-gradient)"
            d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
          />
          <path
            className="whatsapp-phone"
            fill="#fff"
            fillRule="evenodd"
            d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
          />
        </svg>
      </button>

      {/* Animated tooltip */}
      <div className="absolute bottom-20 right-0 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        Chat with us
        <div className="absolute -bottom-1 right-6 w-2 h-2 bg-gray-800 transform rotate-45"></div>
      </div>

      <style>{`
        @keyframes floatAnimation {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes rotateIcon {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(87, 209, 99, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(87, 209, 99, 0.8));
          }
        }

        @keyframes wigglePhone {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          25% {
            transform: translateX(-1px) rotate(-5deg);
          }
          75% {
            transform: translateX(1px) rotate(5deg);
          }
        }

        .whatsapp-float {
          animation: floatAnimation 3s ease-in-out infinite;
        }

        .whatsapp-icon {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .group:hover .whatsapp-icon {
          animation: rotateIcon 0.6s ease-in-out;
        }

        .group:hover .whatsapp-phone {
          animation: wigglePhone 0.5s ease-in-out infinite;
        }

        .whatsapp-circle {
          transition: all 0.3s ease;
        }

        .group:hover .whatsapp-circle {
          filter: brightness(1.1);
        }
      `}</style>
    </div>
  );
}
