import { Link } from "wouter";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const socialLinks = [
  { icon: "fa-brands fa-facebook-f", url: "#", label: "Facebook" },
  { icon: "fa-brands fa-instagram", url: "#", label: "Instagram" },
  { icon: "fa-brands fa-twitter", url: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-border/50 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <span className="text-xl font-semibold tracking-tight text-foreground">
              aqua<span className="text-primary">pure</span>
            </span>
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
                  className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span
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
            <h4 className="font-medium text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-primary w-4" />
                +91 123 456 7890
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-primary w-4" />
                hello@aquapure.in
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-primary w-4 mt-0.5" />
                <span>Mumbai, Maharashtra</span>
              </li>
            </ul>
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
