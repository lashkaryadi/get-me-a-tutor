import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Plus,
  Briefcase,
  Users,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  MapPin,
  IndianRupee,
  BarChart3,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";

const stats = [
  { label: "Active Jobs", value: "8", icon: Briefcase, trend: "+2 this month", color: "primary" },
  { label: "Total Applications", value: "156", icon: FileText, trend: "+23 this week", color: "success" },
  { label: "Profile Views", value: "2.4K", icon: Eye, trend: "+15% vs last month", color: "warning" },
  { label: "Hired Tutors", value: "12", icon: Users, trend: "4 this quarter", color: "accent" },
];

const activeJobs = [
  { id: 1, title: "Mathematics Tutor", applications: 24, views: 156, status: "active", posted: "3 days ago", expires: "27 days left" },
  { id: 2, title: "Physics Faculty", applications: 18, views: 98, status: "active", posted: "1 week ago", expires: "21 days left" },
  { id: 3, title: "English Trainer", applications: 12, views: 67, status: "active", posted: "2 weeks ago", expires: "14 days left" },
  { id: 4, title: "Chemistry Teacher", applications: 8, views: 45, status: "paused", posted: "3 weeks ago", expires: "7 days left" },
];

const recentApplications = [
  { id: 1, name: "Amit Sharma", job: "Mathematics Tutor", experience: "5 years", status: "pending", date: "2 hours ago" },
  { id: 2, name: "Priya Verma", job: "Physics Faculty", experience: "3 years", status: "shortlisted", date: "5 hours ago" },
  { id: 3, name: "Rahul Kumar", job: "English Trainer", experience: "4 years", status: "rejected", date: "1 day ago" },
  { id: 4, name: "Sneha Gupta", job: "Mathematics Tutor", experience: "6 years", status: "pending", date: "1 day ago" },
];

const analytics = [
  { day: "Mon", applications: 12 },
  { day: "Tue", applications: 8 },
  { day: "Wed", applications: 15 },
  { day: "Thu", applications: 10 },
  { day: "Fri", applications: 18 },
  { day: "Sat", applications: 6 },
  { day: "Sun", applications: 4 },
];

export default function InstituteDashboard() {
  const maxApplications = Math.max(...analytics.map((a) => a.applications));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Institute Dashboard</h1>
            <p className="text-muted-foreground">Manage your job postings and applications</p>
          </div>
          <Button asChild size="lg">
            <Link to="/post-job">
              <Plus className="h-5 w-5" />
              Post New Job
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${stat.color}/10`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="mt-2 text-xs text-success">{stat.trend}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Jobs */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Active Job Postings</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/institute/jobs">View All</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="font-semibold text-foreground">{job.title}</h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            job.status === "active"
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          {job.status === "active" ? "Active" : "Paused"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {job.applications} applications
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {job.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.expires}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Chart */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Weekly Applications</h2>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex h-48 items-end justify-between gap-2">
                {analytics.map((day) => (
                  <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg gradient-primary transition-all"
                      style={{ height: `${(day.applications / maxApplications) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Applications */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Recent Applications</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/institute/applications">View All</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                        {app.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{app.name}</div>
                        <div className="text-sm text-muted-foreground">{app.job}</div>
                        <div className="text-xs text-muted-foreground">{app.date}</div>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        app.status === "pending"
                          ? "bg-warning/10 text-warning"
                          : app.status === "shortlisted"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { icon: Plus, label: "Post New Job", to: "/post-job" },
                  { icon: Users, label: "View Applications", to: "/institute/applications" },
                  { icon: Calendar, label: "Schedule Interviews", to: "/institute/interviews" },
                  { icon: Settings, label: "Institute Settings", to: "/institute/settings" },
                ].map((action) => (
                  <Link
                    key={action.label}
                    to={action.to}
                    className="flex items-center gap-3 rounded-lg p-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <action.icon className="h-5 w-5" />
                    <span>{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
