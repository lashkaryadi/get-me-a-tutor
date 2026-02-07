import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import heroImage from "@/assets/tutor-hero.png";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
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
  Sparkles,
  Zap,
  Calculator,
  FlaskConical,
  BookA,
  Code2,
  Globe2,
  Music4,
  Palette,
  BrainCircuit,
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
  { name: "Mathematics", icon: Calculator },
  { name: "Science", icon: FlaskConical },
  { name: "English", icon: BookA },
  { name: "Programming", icon: Code2 },
  { name: "Languages", icon: Globe2 },
  { name: "Music", icon: Music4 },
  { name: "Art", icon: Palette },
  { name: "Test Prep", icon: BrainCircuit },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50 z-10" />
          <img
            src={heroImage}
            alt="Students learning"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          {/* Floating Blobs */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl z-0"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-20 left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl z-0"
          />
        </div>

        <div className="container relative z-20 mx-auto px-4 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20"
              >
                <Trophy className="h-4 w-4" />
                <span className="font-semibold">#1 Tutor Platform in India</span>
              </motion.div>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Find Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  Perfect Tutor
                </span>{" "}
                Today
              </h1>

              <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl leading-relaxed">
                Unlock your potential with verified experts. From complex calculus to creative arts, we connect you with the best mentors.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" className="text-lg px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300" asChild>
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="text-lg px-8 py-6 border-2 hover:bg-muted/50" asChild>
                  <Link to="/feed">Browse Tutors</Link>
                </Button>
              </div>

              {/* Stats Row */}
              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-border/50 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 3D Hero Image/Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                transitionSpeed={1500}
                className="relative z-10"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border border-border/50 bg-card/50 backdrop-blur-sm p-4">
                  <img
                    src={heroImage}
                    alt="Education Hero"
                    className="rounded-2xl w-full h-auto object-cover transform transition-transform hover:scale-105 duration-700"
                  />

                  {/* Floating Badge 1 */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-6 top-10 bg-card p-4 rounded-2xl shadow-xl border border-border/50 flex items-center gap-3"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Verified Tutors</div>
                      <div className="text-xs text-muted-foreground">100% ID Check</div>
                    </div>
                  </motion.div>

                  {/* Floating Badge 2 */}
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -right-6 bottom-20 bg-card p-4 rounded-2xl shadow-xl border border-border/50 flex items-center gap-3"
                  >
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                      <Star className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">4.9/5 Rating</div>
                      <div className="text-xs text-muted-foreground">Active Students</div>
                    </div>
                  </motion.div>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              Explore <span className="text-primary">Subjects</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              Find expert tutors across a wide range of subjects, tailored to your curriculum.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={`/feed?subject=${subject.name}`}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/50 p-6 text-center transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group"
                >
                  <subject.icon className="h-10 w-10 text-primary/80 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {subject.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20 sm:py-32 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              Why Choose Us
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              The <span className="text-primary">Smartest</span> Way to Learn
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              We've built a platform that puts quality and safety first, so you can focus on learning.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Tilt key={feature.title} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={2000} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full rounded-3xl border border-border/50 bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <feature.icon className="h-24 w-24 text-primary transform rotate-12" />
                  </div>

                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              Getting started is easy. Find your perfect tutor in 3 simple steps.
            </p>
          </motion.div>

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
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center group"
              >
                {/* Connector Line (Desktop) */}
                {index !== 2 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-border -z-10 group-hover:bg-primary/30 transition-colors" />
                )}

                <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-primary/20 bg-card shadow-lg group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                  <item.icon className="h-10 w-10 text-primary" />
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md ring-4 ring-background">
                    {item.step}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
                  {item.title}
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              Loved by <span className="text-primary">Thousands</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              Don't just take our word for it. Here's what our community says.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Tilt key={testimonial.name} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={3000}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-3xl border border-border/50 bg-card p-8 shadow-sm transition-all h-full flex flex-col justify-between hover:border-primary/30 hover:shadow-lg"
                >
                  <div>
                    <div className="mb-6 flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="mb-6 text-lg text-foreground italic">"{testimonial.content}"</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-primary z-0">
          {/* Animated blobs in CTA */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] opacity-20"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[100px] opacity-20"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-xl">
              <Zap className="h-10 w-10" />
            </div>

            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mb-10 text-lg text-white/90 sm:text-xl md:text-2xl leading-relaxed">
              Join thousands of students who are already achieving their goals
              with the help of our verified tutors.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="xl"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-xl"
                asChild
              >
                <Link to="/signup">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
