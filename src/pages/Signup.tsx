import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  GraduationCap,
  Building2,
  User,
  Users,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";

type UserRole = "student" | "tutor" | "institute" | "parent";

const roles = [
  {
    id: "student" as UserRole,
    icon: User,
    title: "Student",
    description: "Find and connect with expert tutors",
  },
  {
    id: "parent" as UserRole,
    icon: Users,
    title: "Parent",
    description: "Find tutors for your children",
  },
  {
    id: "tutor" as UserRole,
    icon: GraduationCap,
    title: "Tutor",
    description: "Share your knowledge and earn",
  },
  {
    id: "institute" as UserRole,
    icon: Building2,
    title: "Institute",
    description: "Post jobs and hire tutors",
  },
];

const benefits = [
  "Access to verified tutors",
  "Secure payment system",
  "24/7 customer support",
  "Progress tracking tools",
];

export default function Signup() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup data:", { ...formData, role: selectedRole });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Left Column - Form */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                Create Your Account
              </h1>
              <p className="text-muted-foreground">
                Join our community of learners and educators
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">I want to join as</Label>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`group relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all ${
                        selectedRole === role.id
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {selectedRole === role.id && (
                        <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                          <CheckCircle className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                          selectedRole === role.id
                            ? "gradient-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                        }`}
                      >
                        <role.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {role.title}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {role.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!selectedRole}
              >
                Create Account
                <ArrowRight className="h-5 w-5" />
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>

          {/* Right Column - Info */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24 rounded-2xl gradient-hero p-8 text-primary-foreground lg:p-12">
              <h2 className="mb-6 text-2xl font-bold lg:text-3xl">
                Start Your Learning Journey
              </h2>
              <p className="mb-8 text-primary-foreground/80">
                Join thousands of students and tutors on India's most trusted
                education platform.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/20">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 rounded-xl bg-primary-foreground/10 p-6 backdrop-blur-sm">
                <div className="mb-4 text-4xl font-bold">50,000+</div>
                <div className="text-primary-foreground/80">
                  Verified tutors ready to help you succeed
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
