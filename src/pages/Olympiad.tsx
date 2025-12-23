import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Trophy,
  Medal,
  Clock,
  Users,
  ArrowRight,
  Star,
  Calendar,
  BookOpen,
  Award,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

const upcomingExams = [
  {
    id: 1,
    title: "National Mathematics Olympiad",
    date: "Jan 15, 2025",
    time: "10:00 AM",
    duration: "3 hours",
    participants: 12500,
    prize: "₹1,00,000",
    level: "National",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Science Quiz Championship",
    date: "Jan 22, 2025",
    time: "2:00 PM",
    duration: "2 hours",
    participants: 8750,
    prize: "₹50,000",
    level: "State",
    status: "upcoming",
  },
  {
    id: 3,
    title: "English Language Competition",
    date: "Feb 5, 2025",
    time: "11:00 AM",
    duration: "2.5 hours",
    participants: 5200,
    prize: "₹25,000",
    level: "Regional",
    status: "upcoming",
  },
];

const leaderboard = [
  { rank: 1, name: "Aditya Kumar", score: 9850, badge: "🥇", city: "Delhi" },
  { rank: 2, name: "Sneha Reddy", score: 9720, badge: "🥈", city: "Hyderabad" },
  { rank: 3, name: "Rohit Sharma", score: 9680, badge: "🥉", city: "Mumbai" },
  { rank: 4, name: "Priya Verma", score: 9550, badge: "", city: "Bangalore" },
  { rank: 5, name: "Arjun Singh", score: 9480, badge: "", city: "Chennai" },
  { rank: 6, name: "Kavya Patel", score: 9420, badge: "", city: "Ahmedabad" },
  { rank: 7, name: "Rahul Nair", score: 9350, badge: "", city: "Kochi" },
  { rank: 8, name: "Ananya Gupta", score: 9280, badge: "", city: "Kolkata" },
];

const subjects = [
  { name: "Mathematics", icon: "📐", exams: 45 },
  { name: "Physics", icon: "⚛️", exams: 32 },
  { name: "Chemistry", icon: "🧪", exams: 28 },
  { name: "Biology", icon: "🧬", exams: 24 },
  { name: "Computer Science", icon: "💻", exams: 38 },
  { name: "English", icon: "📚", exams: 20 },
];

export default function Olympiad() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-2 text-sm font-medium text-primary-foreground">
              <Trophy className="h-4 w-4" />
              Student Olympiad 2025
            </div>
            <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
              Compete. Learn. Win.
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              Participate in India's largest student competition platform. Test your
              knowledge, win exciting prizes, and showcase your talent.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                variant="hero-outline"
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/signup">
                  Register Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl">
                View Schedule
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "50K+", label: "Participants", icon: Users },
              { value: "100+", label: "Competitions", icon: Trophy },
              { value: "₹10L+", label: "Prize Pool", icon: Award },
              { value: "500+", label: "Schools", icon: BookOpen },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <div className="text-3xl font-bold text-foreground md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Choose Your Subject
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {subjects.map((subject) => (
              <button
                key={subject.name}
                onClick={() =>
                  setSelectedSubject(
                    selectedSubject === subject.name ? null : subject.name
                  )
                }
                className={`group rounded-xl border-2 p-6 text-center transition-all ${
                  selectedSubject === subject.name
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="mb-3 block text-4xl">{subject.icon}</span>
                <span className="block font-semibold text-foreground">
                  {subject.name}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {subject.exams} exams
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Exams & Leaderboard */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Upcoming Exams */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Upcoming Competitions
              </h2>
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">
                            {exam.title}
                          </h3>
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {exam.level}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exam.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {exam.time} • {exam.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {exam.participants.toLocaleString()} registered
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-success">
                            {exam.prize}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Prize Pool
                          </div>
                        </div>
                        <Button>
                          Register
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Top Performers
              </h2>
              <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                  <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                    <span>Rank</span>
                    <span>Name</span>
                    <span>Score</span>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 ${
                        user.rank <= 3 ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                            user.rank === 1
                              ? "bg-warning text-warning-foreground"
                              : user.rank === 2
                              ? "bg-muted text-foreground"
                              : user.rank === 3
                              ? "bg-warning/50 text-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {user.badge || user.rank}
                        </span>
                        <div>
                          <div className="font-medium text-foreground">
                            {user.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {user.city}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-foreground">
                        {user.score.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border p-4">
                  <Button variant="ghost" className="w-full">
                    View Full Leaderboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Ready to Compete?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of students and start your journey to excellence
          </p>
          <Button size="xl" asChild>
            <Link to="/signup">
              Register Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
