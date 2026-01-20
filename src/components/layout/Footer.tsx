import { Link } from "react-router-dom";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Find Tutors", href: "/feed" },
    { label: "Post a Job", href: "/post-job" },
    { label: "Olympiad", href: "/olympiad" },
    { label: "For Institutes", href: "/institutes" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "FAQ", href: "/faq" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground sm:text-xl">
                Get Me A <span className="text-primary">Tutor</span>
              </span>
            </Link>
            <p className="mb-4 text-xs text-muted-foreground sm:mb-6 sm:text-sm">
              Connecting students with the best tutors worldwide. Find your perfect learning partner today.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground sm:h-10 sm:w-10"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-4 sm:mt-0">
            <h3 className="mb-3 font-semibold text-foreground sm:mb-4">Platform</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 sm:mt-0">
            <h3 className="mb-3 font-semibold text-foreground sm:mb-4">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 sm:mt-0">
            <h3 className="mb-3 font-semibold text-foreground sm:mb-4">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-12 border-t border-border pt-6 sm:pt-8">
          <p className="text-center text-xs text-muted-foreground sm:text-sm">
            © {new Date().getFullYear()} Get Me A Tutor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
