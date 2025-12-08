interface FooterProps {
  onNavigate?: (section: string) => void;
}

const quickLinks = [
  { label: "Home", section: "home" },
  { label: "Products", section: "products" },
  { label: "Services", section: "services" },
  { label: "About Us", section: "about" },
  { label: "Contact", section: "contact" },
];

const socialLinks = [
  { icon: "fa-brands fa-facebook-f", url: "#", label: "Facebook" },
  { icon: "fa-brands fa-instagram", url: "#", label: "Instagram" },
  { icon: "fa-brands fa-twitter", url: "#", label: "Twitter" },
  { icon: "fa-brands fa-youtube", url: "#", label: "YouTube" },
];

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (section: string) => {
    onNavigate?.(section);
    const element = document.getElementById(section);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer
      data-testid="footer"
      className="bg-background border-t border-border py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <i className="fa-solid fa-droplet text-2xl text-primary" />
              <span className="text-xl font-bold text-foreground">
                Aqua<span className="text-primary">Pure</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Premium RO water purifiers for a healthier life. Trusted by 50,000+ families across India.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  data-testid={`social-${social.label.toLowerCase()}`}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => handleNavClick(link.section)}
                    data-testid={`footer-nav-${link.section}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Our Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>New RO Installation</li>
              <li>AMC & Service Plans</li>
              <li>Repair & Maintenance</li>
              <li>Water Quality Testing</li>
              <li>Filter Replacement</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-phone text-primary" />
                +91 123 456 7890
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-primary" />
                info@aquapure.com
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-location-dot text-primary mt-1" />
                <span>123 Water Street,<br />Mumbai, MH 400001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="copyright">
            © {new Date().getFullYear()} AquaPure. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
