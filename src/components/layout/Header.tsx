import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useApi } from "@/hooks/useApi";

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

    const isTutor = user?.role === "tutor";

const { data: myProfileData } = useApi<{
  success: boolean;
  profile: {_id: string};
}>(
  isTutor ? "/profile/teacher/me" : null
);

const myProfileId = myProfileData?.profile._id;

// Determine profile route based on role
const getProfileRoute = () => {
  if (user?.role === "tutor") return "/tutor/dashboard";
  if (user?.role === "institute") return "/institute/dashboard";
  if (user?.role === "parent") return "/parent/dashboard";
  return "/student/dashboard";
};

const profileRoute = getProfileRoute();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
                    <span className="whitespace-nowrap text-sm font-bold sm:text-base md:text-lg">
            Get Me A <span className="text-primary">Tutor</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 sm:py-2 ${
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
          <div className="relative">
            <button
              className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1.5 sm:px-3 sm:py-1.5 hover:border-primary transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {/* Avatar */}
              <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground sm:h-8 sm:w-8 sm:text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* Name */}
              <span className="hidden text-xs font-medium text-foreground sm:block sm:text-sm md:text-base">
                {user.name}
              </span>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card shadow-lg z-50">
                <Link
                  to={profileRoute}
                  className="block px-4 py-2 text-sm hover:bg-muted"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Profile
                </Link>

        
                <button
                  onClick={() => {
                    localStorage.clear();
                    setDropdownOpen(false); // Close dropdown after logout
                    window.location.href = "/login";
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          /* -------- NOT LOGGED IN -------- */
          <div className="hidden items-center gap-2 sm:gap-3 md:flex">
            <Link to="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>

            <Button size="sm" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        )}

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
        <div className="border-t border-border bg-card md:hidden fixed top-16 left-0 right-0 z-40 min-h-[calc(100vh-4rem)]">
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
            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
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
