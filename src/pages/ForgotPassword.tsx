import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Mail, CheckCircle, ArrowRight } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">Check Your Email</h1>
            <p className="mb-8 text-muted-foreground">
              We've sent password reset instructions to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>
            <div className="space-y-4">
              <Button asChild size="lg" className="w-full">
                <Link to="/login">
                  Back to Login
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Didn't receive the email?{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-semibold text-primary hover:underline"
                >
                  Try again
                </button>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link
            to="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
              Forgot Password?
            </h1>
            <p className="mb-8 text-center text-muted-foreground">
              No worries! Enter your email and we'll send you reset instructions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Reset Password
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
