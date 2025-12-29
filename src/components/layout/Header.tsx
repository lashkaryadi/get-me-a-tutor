import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Find Tutors" },
  { href: "/jobs", label: "Jobs" },
  { href: "/olympiad", label: "Olympiad" },
];

export function Header() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          {/* <span className="text-xl font-bold text-foreground"> */}
                    <span className="whitespace-nowrap text-base font-bold sm:text-lg">
            Get Me A <span className="text-primary">Tutor</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}

        {user ? (
          /* -------- LOGGED IN -------- */
          <div className="relative group">
            <button className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 hover:border-primary transition">
              {/* Avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* Name */}
              <span className="hidden md:block text-sm font-medium text-foreground">
                {user.name}
              </span>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 hidden w-48 rounded-xl border border-border bg-card shadow-lg group-hover:block">
              <Link
                to={
                  user.role === "tutor"
                    ? `/tutor/${user.id}`
                    : `/${user.role}/dashboard`
                }
                className="block px-4 py-2 text-sm hover:bg-muted"
              >
                My Profile
              </Link>

              <Link
                to={`/${user.role}/dashboard`}
                className="block px-4 py-2 text-sm hover:bg-muted"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
                className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          /* -------- NOT LOGGED IN -------- */
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>

            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        )}

        {/* <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div> */}

        {/* Mobile Menu Toggle */}
        <button
          className="flex items-center justify-center p-2 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-6 border-t border-border pt-4">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
