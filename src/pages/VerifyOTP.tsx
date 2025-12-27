import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import apiClient from "@/api/apiClient";
import { AxiosError } from "axios";

export default function VerifyOTP() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const contact = searchParams.get("contact") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 🔁 Resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // 🔢 OTP input handler
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ✅ VERIFY OTP
const handleVerify = async () => {
  const otpCode = otp.join("");
  const email = contact; // 👈 URL se already aa raha hai

  if (!email || otpCode.length !== 6) {
    alert("Email and OTP required");
    return;
  }

  try {
    await apiClient.post("/auth/verify-email", {
      email,
      otp: otpCode,
    });

    setIsVerified(true);

    // cleanup
    localStorage.removeItem("tempEmail");
    localStorage.removeItem("tempUserId");
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert("OTP verification failed");
    }
  }
};


  // 🔁 RESEND OTP
  const handleResend = async () => {
    if (resendTimer > 0) return;

    try {
      await apiClient.post("/auth/resend-email-otp", {
        userId: localStorage.getItem("tempUserId"),
      });

      setResendTimer(30);
      alert("OTP resent successfully");
    } catch (error: unknown) {
  if (error instanceof AxiosError) {
    alert(error.response?.data?.message || "OTP verification failed");
  } else {
    alert("Something went wrong");
  }
}

  };

  // 🎉 SUCCESS SCREEN
  if (isVerified) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="mb-2 text-2xl font-bold">
              Email Verified Successfully 🎉
            </h1>
            <p className="mb-8 text-muted-foreground">
              Your account has been activated.
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

  // 🔐 OTP INPUT SCREEN
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link
            to="/signup"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Signup
          </Link>

          <div className="rounded-2xl border bg-card p-8 shadow-lg">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold">
              Verify Your Email
            </h1>
            <p className="mb-8 text-center text-muted-foreground">
              OTP sent to <span className="font-medium">{contact}</span>
            </p>

            {/* OTP boxes */}
            <div className="mb-6 flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  aria-label={`OTP digit ${index + 1}`}
                  placeholder="•"
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-14 w-12 rounded-xl border-2 text-center text-2xl font-bold focus:border-primary focus:outline-none"
                />
              ))}
            </div>

            <Button
              onClick={handleVerify}
              size="lg"
              className="w-full"
              disabled={otp.some((d) => !d)}
            >
              Verify OTP
            </Button>

            <div className="mt-6 text-center">
              <button
                onClick={handleResend}
                disabled={resendTimer > 0}
                className="text-sm font-semibold text-primary disabled:text-muted-foreground"
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
