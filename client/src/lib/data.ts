import product1 from "@assets/generated_images/modern_ro_water_purifier_product.png";
import product2 from "@assets/generated_images/premium_black_ro_purifier.png";
import product3 from "@assets/generated_images/under-sink_ro_system.png";
import product4 from "@assets/generated_images/commercial_ro_purifier.png";
import type { Product } from "@/components/ProductCard";
import type { Service } from "@/components/ServiceCard";

// todo: remove mock functionality - replace with API calls
export const products: Product[] = [
  {
    id: 1,
    name: "AquaPure Pro 7",
    image: product1,
    price: "12,999",
    originalPrice: "15,999",
    description: "7-stage purification with smart indicators. Perfect for medium families.",
    features: ["7-Stage Purification", "10L Storage", "Smart LED", "1 Year Warranty"],
    badge: "Popular",
  },
  {
    id: 2,
    name: "AquaPure Elite",
    image: product2,
    price: "18,499",
    originalPrice: "22,999",
    description: "Premium RO+UV+UF technology with touch display and mineral enhancer.",
    features: ["RO + UV + UF", "Touch Display", "Mineral Boost", "2 Year Warranty"],
    badge: "Premium",
  },
  {
    id: 3,
    name: "AquaPure Slim",
    image: product3,
    price: "9,999",
    description: "Compact under-sink installation. Space-saving design for modern kitchens.",
    features: ["Under-sink", "Compact Design", "5-Stage Filter", "1 Year Warranty"],
  },
  {
    id: 4,
    name: "AquaPure Commercial",
    image: product4,
    price: "45,999",
    description: "Industrial grade purification for offices, restaurants, and large spaces.",
    features: ["50 LPH Capacity", "Steel Body", "Auto-flush", "3 Year Warranty"],
    badge: "Commercial",
  },
];

export const services: Service[] = [
  {
    id: 1,
    icon: "fa-solid fa-wrench",
    title: "Installation",
    description: "Professional installation by certified technicians with free site assessment.",
    features: ["Same-day service", "Free assessment", "Quality parts"],
  },
  {
    id: 2,
    icon: "fa-solid fa-file-contract",
    title: "AMC Plans",
    description: "Comprehensive annual maintenance with scheduled servicing and priority support.",
    features: ["Scheduled visits", "Filter replacement", "Priority support"],
  },
  {
    id: 3,
    icon: "fa-solid fa-screwdriver-wrench",
    title: "Repairs",
    description: "Expert repair services with genuine spare parts and quick turnaround.",
    features: ["90-day warranty", "Genuine parts", "Quick service"],
  },
  {
    id: 4,
    icon: "fa-solid fa-flask-vial",
    title: "Water Testing",
    description: "Free TDS testing and comprehensive water quality analysis.",
    features: ["Free testing", "Detailed report", "Expert advice"],
  },
];

export const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "K+", label: "Happy Customers" },
  { value: 100, suffix: "+", label: "Cities Served" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

export const highlights = [
  "Certified & trained technicians",
  "100% genuine products & parts",
  "Eco-friendly solutions",
  "Transparent pricing",
  "Quick response time",
  "Customer satisfaction guarantee",
];
