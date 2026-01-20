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
    name: "Priya Sharma",
    role: "Parent",
    avatar: "PS",
    content:
      "Finding the right tutor for my daughter was so easy. She improved her math grades from C to A in just 3 months!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "College Student",
    avatar: "RK",
    content:
      "The platform helped me find a physics tutor who explained complex concepts in simple terms. Highly recommend!",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "High School Student",
    avatar: "AP",
    content:
      "I love how easy it is to schedule sessions. My tutor is amazing and has helped me prepare for my JEE exams.",
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

        <div className="container relative mx-auto px-4 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
              #1 Tutor Platform in India
            </div>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              Find Your Perfect{" "}
              <span className="text-primary">Tutor</span> Today
            </h1>
            <p className="mb-6 text-base text-primary-foreground/80 sm:text-lg md:text-xl">
              Connect with verified, experienced tutors who can help you achieve
              your academic goals. From math to music, we've got you covered.
            </p>

            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
              <Button variant="hero" size="lg" className="sm:size-xl" asChild>
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" className="sm:size-xl" asChild>
                <Link to="/feed">Browse Tutors</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-primary-foreground sm:text-2xl md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-xs text-primary-foreground/70 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
              Explore Subjects
            </h2>
            <p className="mx-auto max-w-xs sm:max-w-2xl text-sm text-muted-foreground sm:text-base">
              Find expert tutors across a wide range of subjects
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {subjects.map((subject) => (
              <Link
                key={subject.name}
                to={`/feed?subject=${subject.name}`}
                className="group flex flex-col items-center gap-2 sm:gap-3 rounded-xl border border-border bg-card p-4 sm:p-6 text-center transition-all hover:border-primary hover:shadow-lg"
              >
                <span className="text-3xl sm:text-4xl">{subject.icon}</span>
                <span className="text-xs font-medium text-foreground sm:text-sm group-hover:text-primary">
                  {subject.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
              Why Choose Us?
            </h2>
            <p className="mx-auto max-w-xs sm:max-w-2xl text-sm text-muted-foreground sm:text-base">
              We've built the most trusted platform for connecting students with
              quality tutors
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-5 sm:p-8 transition-all hover:border-primary hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-3 sm:mb-4 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                  <feature.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground sm:mb-3 sm:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-xs sm:max-w-2xl text-sm text-muted-foreground sm:text-base">
              Getting started is easy. Find your perfect tutor in 3 simple steps.
            </p>
          </div>

          <div className="grid gap-8">
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
                <div className="relative z-10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-primary bg-card sm:h-24 sm:w-24">
                  <item.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground sm:-right-2 sm:-top-2 sm:h-8 sm:w-8 sm:text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground sm:mb-3 sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-xs sm:max-w-2xl text-sm text-muted-foreground sm:text-base">
              Join thousands of satisfied students and parents
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="mb-3 flex gap-1 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 fill-warning text-warning"
                    />
                  ))}
                </div>
                <p className="mb-4 text-sm text-foreground sm:mb-6 sm:text-base">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground sm:h-12 sm:w-12">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground sm:text-sm">
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
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-24">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-xs sm:max-w-3xl">
            <BookOpen className="mx-auto mb-4 h-12 w-12 sm:mb-6 sm:h-16 sm:w-16 text-primary-foreground" />
            <h2 className="mb-4 text-2xl font-bold text-primary-foreground sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
              Ready to Start Learning?
            </h2>
            <p className="mb-6 text-sm text-primary-foreground/80 sm:mb-8 sm:text-base md:text-lg">
              Join thousands of students who are already achieving their goals
              with the help of our verified tutors.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:gap-4 sm:flex-row">
              <Button
                variant="hero-outline"
                size="lg"
                className="sm:size-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/signup">
                  Get Started for Free
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
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
