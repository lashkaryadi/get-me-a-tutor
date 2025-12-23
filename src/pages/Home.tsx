import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import heroImage from "@/assets/hero-education.jpg";
import {
  Search,
  Users,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Trophy,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Matching",
    description:
      "Our AI-powered algorithm connects you with tutors that perfectly match your learning style and goals.",
  },
  {
    icon: Users,
    title: "Verified Tutors",
    description:
      "Every tutor goes through a rigorous verification process to ensure quality education.",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    description:
      "Access tutors with proven track records and certified qualifications.",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description:
      "Your data and payments are protected with enterprise-grade security.",
  },
];

const stats = [
  { value: "50K+", label: "Active Tutors" },
  { value: "200K+", label: "Students" },
  { value: "1M+", label: "Sessions Completed" },
  { value: "4.9", label: "Average Rating" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Parent",
    avatar: "SJ",
    content:
      "Finding the right tutor for my daughter was so easy. She improved her math grades from C to A in just 3 months!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "College Student",
    avatar: "MC",
    content:
      "The platform helped me find a physics tutor who explained complex concepts in simple terms. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Williams",
    role: "High School Student",
    avatar: "EW",
    content:
      "I love how easy it is to schedule sessions. My tutor is amazing and has helped me prepare for my SATs.",
    rating: 5,
  },
];

const subjects = [
  { name: "Mathematics", icon: "📐" },
  { name: "Science", icon: "🔬" },
  { name: "English", icon: "📚" },
  { name: "Programming", icon: "💻" },
  { name: "Languages", icon: "🌍" },
  { name: "Music", icon: "🎵" },
  { name: "Art", icon: "🎨" },
  { name: "Test Prep", icon: "📝" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Students learning together"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
        </div>

        <div className="container relative mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              <Trophy className="h-4 w-4" />
              #1 Tutor Platform in India
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Find Your Perfect{" "}
              <span className="text-primary">Tutor</span> Today
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              Connect with verified, experienced tutors who can help you achieve
              your academic goals. From math to music, we've got you covered.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="hero" size="xl" asChild>
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/feed">Browse Tutors</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary-foreground md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Explore Subjects
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Find expert tutors across a wide range of subjects
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {subjects.map((subject) => (
              <Link
                key={subject.name}
                to={`/feed?subject=${subject.name}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg"
              >
                <span className="text-4xl">{subject.icon}</span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary">
                  {subject.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Why Choose Us?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              We've built the most trusted platform for connecting students with
              quality tutors
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Getting started is easy. Find your perfect tutor in 3 simple steps.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Search,
                title: "Search",
                description:
                  "Browse our extensive database of verified tutors by subject, location, and availability.",
              },
              {
                step: "02",
                icon: CheckCircle,
                title: "Connect",
                description:
                  "Review profiles, read reviews, and connect with tutors that match your needs.",
              },
              {
                step: "03",
                icon: GraduationCap,
                title: "Learn",
                description:
                  "Schedule sessions, track progress, and achieve your academic goals.",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                {index < 2 && (
                  <div className="absolute right-0 top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary to-transparent md:block" />
                )}
                <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-primary bg-card">
                  <item.icon className="h-10 w-10 text-primary" />
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                    {item.step}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Join thousands of satisfied students and parents
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-warning text-warning"
                    />
                  ))}
                </div>
                <p className="mb-6 text-foreground">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <BookOpen className="mx-auto mb-6 h-16 w-16 text-primary-foreground" />
            <h2 className="mb-6 text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
              Ready to Start Learning?
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/80">
              Join thousands of students who are already achieving their goals
              with the help of our verified tutors.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                variant="hero-outline"
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/signup">
                  Get Started for Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
