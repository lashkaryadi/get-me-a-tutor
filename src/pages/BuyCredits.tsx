import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCredit } from "@/context/CreditContext";
import apiClient from "@/api/apiClient";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const plans = [
  { credits: 10, amount: 199 },  // ₹199 for 10 credits
  { credits: 25, amount: 399 },  // ₹399 for 25 credits
  { credits: 50, amount: 699 },  // ₹699 for 50 credits
];

export default function BuyCredits() {
  const navigate = useNavigate();
  const { refreshCredits } = useCredit();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  /**
   * Initiate Razorpay payment flow
   * 1. Create order on backend (/api/payments/create-order)
   * 2. Open Razorpay checkout
   * 3. Verify payment on backend (/api/payments/verify-payment)
   * 4. Credits will be added via webhook (backend handles)
   * 5. Refresh credits and redirect
   */
  const handlePayment = async (amount: number, credits: number) => {
    if (loading) return;

    setLoading(true);
    try {
      // Get user role from localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user || !user.role) {
        throw new Error("User not Creditenticated");
      }

      // Step 1: Create Razorpay order
      const response = await apiClient.post("/api/payments/create-order", {
        amount,
        credits,
        role: user.role
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create order");
      }

      const { order } = response.data;

      // Step 2: Configure and open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Get Me A Tutor",
        description: `${credits} Credits Purchase`,
        prefill: {
          name: user.name || "",
          email: user.email || "",
        },
        theme: {
          color: "#3b82f6",
        },
        handler: async (razorpayResponse: any) => {
          try {
            // Step 3: Verify payment with backend
            const verifyResponse = await apiClient.post(
              "/api/payments/verify-payment",
              {
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
              }
            );

            if (verifyResponse.data.success) {
              // Step 4: Immediate update (backend now adds credits synchronously)
              toast({
                title: "Payment Successful ✅",
                description: "Credits have been added to your account.",
              });

              // No delay needed anymore - credits are added synchronously
              try {
                await refreshCredits();

                toast({
                  title: "Credits Updated! ✅",
                  description: "Your new balance is now available.",
                });
              } catch (error) {
                console.warn("Credit refresh failed, but payment succeeded:", error);
                // Even if refresh fails, the credits are in DB. 
                // Next page load will show them.
              }

              // Redirect to appropriate dashboard
              if (user.role === "tutor") {
                navigate("/tutor/dashboard");
              } else if (user.role === "institute") {
                navigate("/institute/dashboard");
              } else {
                navigate("/feed");
              }
            } else {
              throw new Error(
                verifyResponse.data.message || "Payment verification failed"
              );
            }
          } catch (verifyError: any) {
            console.error("Payment verification error:", verifyError);
            toast({
              title: "Verification Failed ❌",
              description:
                verifyError.message || "Could not verify your payment",
              variant: "destructive",
            });
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            // User closed Razorpay without payment
            setLoading(false);
            toast({
              title: "Payment Cancelled",
              description: "No charges have been made",
            });
          }
        }
      };

      // Load Razorpay script if not already loaded
      if (!(window as any).Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        };
        script.onerror = () => {
          setLoading(false);
          toast({
            title: "Script Load Error ❌",
            description: "Failed to load payment processor",
            variant: "destructive",
          });
        };
        document.body.appendChild(script);
      } else {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error: any) {
      console.error("Payment creation error:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to initiate payment";
      toast({
        title: "Payment Error ❌",
        description: errorMsg,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Buy Credits</h1>
          <p className="text-muted-foreground mb-8">
            Purchase credits to apply for jobs or post job listings
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <h3 className="text-lg font-semibold">{plan.credits} Credits</h3>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold">₹{plan.amount}</span>
                  <span className="text-muted-foreground"> / one time</span>
                </div>

                <Button
                  className="w-full"
                  onClick={() => handlePayment(plan.amount * 100, plan.credits)}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Buy Now"}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">How Credits Work</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">•</span>
                <span>Tutors spend 1 credit per job application</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">•</span>
                <span>Institutes spend 1 credit per job posting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">•</span>
                <span>New tutors and institutes get 5 free credits on signup</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}