import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Mail, Phone, CheckCircle } from "lucide-react";

export default function VerifyOTP() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "email"; // email or phone
  const contact = searchParams.get("contact") || "";
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      console.log("Verifying OTP:", otpCode);
      setIsVerified(true);
    }
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      console.log("Resending OTP");
      setResendTimer(30);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">Verification Successful!</h1>
            <p className="mb-8 text-muted-foreground">
              Your {type === "email" ? "email" : "phone number"} has been verified successfully.
            </p>
            <Button asChild size="lg">
              <Link to="/login">Continue to Login</Link>
            </Button>
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
            to="/signup"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Signup
          </Link>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
              {type === "email" ? (
                <Mail className="h-8 w-8 text-primary-foreground" />
              ) : (
                <Phone className="h-8 w-8 text-primary-foreground" />
              )}
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
              Verify Your {type === "email" ? "Email" : "Phone"}
            </h1>
            <p className="mb-8 text-center text-muted-foreground">
              We've sent a 6-digit code to{" "}
              <span className="font-medium text-foreground">{contact || (type === "email" ? "your email" : "your phone")}</span>
            </p>

            {/* OTP Input */}
            <div className="mb-6 flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-14 w-12 rounded-xl border-2 border-border bg-background text-center text-2xl font-bold text-foreground transition-colors focus:border-primary focus:outline-none"
                />
              ))}
            </div>

            <Button
              onClick={handleVerify}
              size="lg"
              className="w-full"
              disabled={otp.some((d) => !d)}
            >
              Verify Code
            </Button>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  className={`font-semibold ${
                    resendTimer > 0 ? "text-muted-foreground" : "text-primary hover:underline"
                  }`}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
