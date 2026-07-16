import { Link } from "wouter";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
];

const actionLinks = [
  { label: "Book Service", path: "/service-booking" },
  { label: "File Complaint", path: "/complaint" },
  { label: "Contact", path: "/contact" },
];

const socialLinks = [
  { icon: "fa-brands fa-facebook-f", url: "#", label: "Facebook" },
  { icon: "fa-brands fa-instagram", url: "#", label: "Instagram" },
  { icon: "fa-brands fa-twitter", url: "#", label: "Twitter" },
];

export default function Footer() {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer data-testid="footer" className="border-t border-border/50 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/assets/images/logo.png" 
                alt="AquaPure Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">
              Premium RO water purification systems for homes and businesses. 
              Trusted by over 50,000 customers across India.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  data-testid={`social-${social.label.toLowerCase()}`}
                  className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-icon-bounce"
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span
                      onClick={handleLinkClick}
                      data-testid={`footer-nav-${link.label.toLowerCase()}`}
                      className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-sm"
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {actionLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span
                      onClick={handleLinkClick}
                      data-testid={`footer-action-${link.label.toLowerCase()}`}
                      className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-sm"
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h5 className="font-medium text-foreground text-sm mb-3">Contact Us</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-phone text-primary w-4" />
                        +91 82088 36372
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-primary w-4" />
                        support@amravatiro.com
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-location-dot text-primary w-4 mt-0.5" />
                  <span>                        Plot no 7, Behind bus stand, near Adhiraj mini mart-kedar chauk road, Warud, Amravati
</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground" data-testid="copyright">
            © {new Date().getFullYear()} AquaPure. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
