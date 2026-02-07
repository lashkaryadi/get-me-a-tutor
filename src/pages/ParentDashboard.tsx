import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  Users,
  Calendar,
  BookOpen,
  Trophy,
  Award,
  Clock,
  Star,
  CheckCircle,
  Target,
  BarChart3,
  FileText,
  MessageCircle,
  IndianRupee,
  GraduationCap,
  Search,
} from "lucide-react";

// Mock data for parent dashboard
// TODO: Replace with real API calls when backend endpoints are available
const parentData = {
  children: [
    {
      id: "1",
      name: "Aditya Lashkary",
      grade: "Class 10",
      school: "Delhi Public School",
      subjects: [
        { name: "Mathematics", progress: 85, tutor: "Mr. Sharma" },
        { name: "Science", progress: 78, tutor: "Ms. Verma" },
        { name: "English", progress: 92, tutor: "Mrs. Gupta" },
      ],
      upcomingClasses: 3,
      completedClasses: 24,
    },
    {
      id: "2",
      name: "Priya Lashkary",
      grade: "Class 8",
      school: "Delhi Public School",
      subjects: [
        { name: "Mathematics", progress: 90, tutor: "Mr. Kumar" },
        { name: "Hindi", progress: 88, tutor: "Ms. Patel" },
      ],
      upcomingClasses: 2,
      completedClasses: 18,
    },
  ],
  recentBookings: [
    {
      id: "1",
      childName: "Aditya Lashkary",
      tutorName: "Mr. Sharma",
      subject: "Mathematics",
      date: "2026-02-10",
      time: "4:00 PM",
      status: "confirmed",
    },
    {
      id: "2",
      childName: "Priya Lashkary",
      tutorName: "Mr. Kumar",
      subject: "Mathematics",
      date: "2026-02-11",
      time: "5:00 PM",
      status: "confirmed",
    },
  ],
};

export default function ParentDashboard() {
  const { user } = useAuth();
  const credits = user?.credits ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-2 text-sm font-medium text-primary-foreground">
              <Users className="h-4 w-4" />
              Parent Dashboard
            </div>
            <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
              Welcome, {user?.name || "Parent"}
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              Manage your children's learning journey and connect with the best tutors
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                variant="hero-outline"
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/feed">
                  Find Tutors
                  <Search className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/buy-credits">
                  Buy Credits
                  <IndianRupee className="h-5 w-5 ml-2" />
                </Link>
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
              { value: parentData.children.length.toString(), label: "Children", icon: Users },
              { value: credits.toString(), label: "Credits Available", icon: IndianRupee },
              { value: "5", label: "Active Tutors", icon: GraduationCap },
              { value: "42", label: "Classes This Month", icon: BookOpen },
            ].map((stat, index) => (
              <div key={index} className="text-center">
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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Children Profiles */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Children's Progress
                </h2>
                <div className="space-y-6">
                  {parentData.children.map((child) => (
                    <div
                      key={child.id}
                      className="rounded-xl border border-border bg-card p-6"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                            {child.name.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground">{child.name}</h3>
                          <p className="text-muted-foreground mb-4">
                            {child.grade} | {child.school}
                          </p>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center p-3 rounded-lg bg-muted">
                              <div className="text-2xl font-bold text-primary">
                                {child.upcomingClasses}
                              </div>
                              <div className="text-xs text-muted-foreground">Upcoming</div>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted">
                              <div className="text-2xl font-bold text-success">
                                {child.completedClasses}
                              </div>
                              <div className="text-xs text-muted-foreground">Completed</div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold text-sm">Subject Progress</h4>
                            {child.subjects.map((subject, idx) => (
                              <div key={idx}>
                                <div className="flex justify-between mb-1 text-sm">
                                  <span className="font-medium">{subject.name}</span>
                                  <span className="text-muted-foreground">{subject.progress}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-muted">
                                  <div
                                    className="h-2 rounded-full bg-primary"
                                    style={{ width: `${subject.progress}%` }}
                                  ></div>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Tutor: {subject.tutor}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  Upcoming Classes
                </h2>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="space-y-4">
                    {parentData.recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border"
                      >
                        <div>
                          <h3 className="font-semibold text-foreground">{booking.subject}</h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.childName} • {booking.tutorName}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(booking.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {booking.time}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-success/10 text-success">
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  Quick Actions
                </h2>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/feed">
                        <Search className="h-4 w-4 mr-2" />
                        Find Tutors
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/olympiad">
                        <Trophy className="h-4 w-4 mr-2" />
                        Register for Olympiad
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Schedule
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Progress Reports
                    </Button>
                  </div>
                </div>
              </div>

              {/* Credits */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
                  <IndianRupee className="h-6 w-6 text-primary" />
                  Credits
                </h2>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-primary">{credits}</span>
                    <IndianRupee className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use credits to book tutors and access premium features
                  </p>
                  <Button className="w-full" asChild>
                    <Link to="/buy-credits">Buy More Credits</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
