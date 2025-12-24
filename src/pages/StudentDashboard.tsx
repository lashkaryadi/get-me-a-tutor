import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  Trophy,
  Users,
  Award,
  Clock,
  Star,
  CheckCircle,
  Target,
  BarChart3,
  FileText,
  MessageCircle,
} from "lucide-react";

// Mock data for student details
const studentDetails = {
  name: "Aditya Lashkary",
  grade: "Class 10",
  school: "Delhi Public School, New Delhi",
  profileImage: "https://github.com/shadcn.png",
  subjects: [
    { name: "Mathematics", progress: 85, status: "excellent" },
    { name: "Science", progress: 78, status: "good" },
    { name: "English", progress: 92, status: "excellent" },
    { name: "Social Studies", progress: 70, status: "average" },
  ],
  achievements: [
    { title: "Mathematics Olympiad", rank: "2nd Place", date: "Dec 2024" },
    { title: "Science Quiz", rank: "1st Place", date: "Nov 2024" },
    { title: "Debate Competition", rank: "3rd Place", date: "Oct 2024" },
  ],
  learningGoals: [
    { title: "Complete Algebra course", progress: 90, status: "on track" },
    { title: "Improve Science scores", progress: 60, status: "needs work" },
    { title: "Prepare for Olympiad", progress: 75, status: "on track" },
  ],
};

// Mock data for upcoming exams
const upcomingExams = [
  {
    id: 1,
    title: "Mathematics Quarterly Exam",
    date: "Jan 15, 2025",
    time: "10:00 AM",
    duration: "3 hours",
    subject: "Mathematics",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Science Mid-term Exam",
    date: "Jan 22, 2025",
    time: "2:00 PM",
    duration: "2.5 hours",
    subject: "Science",
    status: "upcoming",
  },
  {
    id: 3,
    title: "English Final Exam",
    date: "Feb 5, 2025",
    time: "11:00 AM",
    duration: "2 hours",
    subject: "English",
    status: "upcoming",
  },
  {
    id: 4,
    title: "National Mathematics Olympiad",
    date: "Feb 15, 2025",
    time: "9:00 AM",
    duration: "4 hours",
    subject: "Mathematics",
    status: "registered",
  },
];

// Mock data for Olympiad competitions
const olympiadCompetitions = [
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
    status: "registered",
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

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-2 text-sm font-medium text-primary-foreground">
              <GraduationCap className="h-4 w-4" />
              Student Dashboard
            </div>
            <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
              Welcome, {studentDetails.name}
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              Track your academic progress, upcoming exams, and participate in competitions
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                variant="hero-outline"
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/olympiad">
                  Explore Competitions
                  <Trophy className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl">
                View Schedule
                <Calendar className="h-5 w-5 ml-2" />
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
              { value: studentDetails.grade, label: "Current Grade", icon: GraduationCap },
              { value: "88%", label: "Overall Progress", icon: BarChart3 },
              { value: "92%", label: "English", icon: FileText },
              { value: "4", label: "Active Goals", icon: Target },
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
            {/* Student Details */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  Student Profile
                </h2>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={studentDetails.profileImage}
                        alt={studentDetails.name}
                        className="h-24 w-24 rounded-full object-cover border-4 border-primary/20"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{studentDetails.name}</h3>
                      <p className="text-muted-foreground mb-2">{studentDetails.grade} | {studentDetails.school}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          <CheckCircle className="h-3 w-3" />
                          Verified Student
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                          <Star className="h-3 w-3" />
                          Top Performer
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-foreground mb-4">Subject Progress</h4>
                    <div className="space-y-4">
                      {studentDetails.subjects.map((subject, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium text-foreground">{subject.name}</span>
                            <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className={`h-2 rounded-full ${
                                subject.status === 'excellent' ? 'bg-success' :
                                subject.status === 'good' ? 'bg-primary' :
                                'bg-warning'
                              }`}
                              style={{ width: `${subject.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Goals */}
              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Learning Goals
                </h2>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="space-y-4">
                    {studentDetails.learningGoals.map((goal, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div>
                          <h3 className="font-medium text-foreground">{goal.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="h-2 w-32 rounded-full bg-muted">
                              <div
                                className={`h-2 rounded-full ${
                                  goal.status === 'on track' 
                                    ? 'bg-success' : 'bg-warning'
                                }`}
                                style={{ width: `${goal.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          goal.status === 'on track' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {goal.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Achievements */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Recent Achievements
                </h2>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="space-y-4">
                    {studentDetails.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Trophy className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.rank}</p>
                          <p className="text-xs text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  Quick Actions
                </h2>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/olympiad">
                        <Trophy className="h-4 w-4 mr-2" />
                        Register for Olympiad
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Study Materials
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Join Study Group
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Progress Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Olympiad Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Olympiad Competitions
            </h2>
            <Button variant="ghost" asChild>
              <Link to="/olympiad">
                View All Competitions
                <Trophy className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {olympiadCompetitions.map((exam) => (
              <div
                key={exam.id}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {exam.level}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    exam.status === 'registered' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-warning/10 text-warning'
                  }`}>
                    {exam.status}
                  </span>
                </div>
                <h3 className="mb-3 font-semibold text-foreground text-lg">
                  {exam.title}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{exam.date} • {exam.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{exam.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{exam.participants.toLocaleString()} registered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-success" />
                    <span className="font-medium text-success">{exam.prize}</span>
                  </div>
                </div>
                <Button className="mt-4 w-full">
                  {exam.status === 'registered' ? 'Registered' : 'Register Now'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Exams Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Upcoming Exams
            </h2>
            <Button variant="ghost" asChild>
              <Link to="/calendar">
                View Calendar
                <Calendar className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">Exam</th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">Subject</th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">Date & Time</th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">Duration</th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {upcomingExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-muted/50">
                      <td className="py-4 px-6 font-medium text-foreground">{exam.title}</td>
                      <td className="py-4 px-6 text-muted-foreground">{exam.subject}</td>
                      <td className="py-4 px-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {exam.date} • {exam.time}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">{exam.duration}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          exam.status === 'registered' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {exam.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}