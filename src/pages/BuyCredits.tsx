import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCredit } from "@/context/CreditContext";
import { CheckCircle } from "lucide-react";

const plans = [
  { credits: 10, amount: 199 },  // ₹199 for 10 credits
  { credits: 25, amount: 399 },  // ₹399 for 25 credits
  { credits: 50, amount: 699 },  // ₹699 for 50 credits
];

export default function BuyCredits() {
  const navigate = useNavigate();
  const { refreshCredits } = useCredit();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (amount: number, credits: number) => {
    setLoading(true);
    try {
      // Call backend to create Razorpay order
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Get Me A Tutor",
        description: `${credits} Credits Purchase`,
        handler: async (response: any) => {
          try {
            // Verify payment with backend
            const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
              // Payment verified successfully, but credits will be added via webhook
              // Show success message and redirect to dashboard
              alert('Payment successful! Credits will be added shortly.');

              // Redirect to appropriate dashboard based on user role
              const user = JSON.parse(localStorage.getItem('user') || '{}');
              if (user.role === 'tutor') {
                navigate('/tutor/dashboard');
              } else if (user.role === 'institute') {
                navigate('/institute/dashboard');
              } else {
                navigate('/');
              }
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem('user') || '{}').name,
          email: JSON.parse(localStorage.getItem('user') || '{}').email,
        },
        theme: {
          color: '#3b82f6',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment creation error:', error);
      alert('Failed to initiate payment');
    } finally {
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
                  onClick={() => handlePayment(plan.amount * 100, plan.credits)} // Razorpay expects amount in paise
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Buy Now'}
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