import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCredit } from "@/context/CreditContext";
import { 
  Briefcase, 
  FileText, 
  Users, 
  Star, 
  TrendingUp, 
  Calendar,
  MapPin,
  IndianRupee,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  BarChart3,
  Award,
  MessageCircle
} from "lucide-react";
import { useApi } from "@/hooks/useApi";

export default function TutorDashboard() {
const { credits } = useCredit();
  // Private endpoint: GET /profile/teacher/me (requires Credit)
  const { data: profileData, loading: profileLoading } = useApi("/profile/teacher/me");
  
  // Private endpoint: GET /applications/my (requires Credit, tutor only)
  const { data: applicationsData, loading: applicationsLoading } = useApi<{
    success: boolean;
    applications: any[];
  }>("/applications/my");

  const recentApplications = Array.isArray(applicationsData?.applications)
    ? applicationsData.applications.slice(0, 4)
    : [];

  // Mock data for stats (would be derived from applications and profile in production)
  const stats = [
    { 
      label: "Total Applications", 
      value: applicationsData?.applications?.length?.toString() ?? "0", 
      icon: FileText, 
      trend: "+5 this week", 
      color: "primary" 
    },
    { label: "Successful Matches", value: "8", icon: CheckCircle, trend: "30% conversion", color: "success" },
    { label: "Profile Views", value: "156", icon: Eye, trend: "+23 this week", color: "warning" },
    { label: "Avg Rating", value: "4.9", icon: Star, trend: "Based on 42 reviews", color: "accent" },
  ];

  // Mock data for earnings
  const earnings = [
    { month: "Jan", amount: 45000 },
    { month: "Feb", amount: 38000 },
    { month: "Mar", amount: 52000 },
    { month: "Apr", amount: 48000 },
    { month: "May", amount: 62000 },
    { month: "Jun", amount: 55000 },
  ];

  const maxEarning = Math.max(...earnings.map(a => a.amount));

  if (profileLoading || applicationsLoading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tutor Dashboard</h1>
            <p className="text-muted-foreground">Manage your job applications and earnings</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="credit-pill bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Credits: {credits}
            </div>
            <Button asChild size="lg">
              <Link to="/feed">
                <Briefcase className="h-5 w-5" />
                Browse Jobs
              </Link>
            </Button>
          </div>
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
            {/* Recent Applications */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Recent Applications</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/my-applications">View All</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {recentApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No applications yet. <Link to="/feed" className="text-primary hover:underline">Browse jobs</Link></p>
                  </div>
                ) : (
                  recentApplications.map((app) => {
                    const getStatusBadge = (status: string) => {
                      const styles: { [key: string]: string } = {
                        selected: "bg-green-100 text-green-700 border-green-200",
                        shortlisted: "bg-blue-100 text-blue-700 border-blue-200",
                        rejected: "bg-red-100 text-red-700 border-red-200",
                        applied: "bg-yellow-100 text-yellow-700 border-yellow-200",
                      };
                      return styles[status] || "bg-gray-100 text-gray-700 border-gray-200";
                    };

                    return (
                      <div
                        key={app._id || app.id}
                        className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="font-semibold text-foreground">{app.job?.title || "Job Unavailable"}</h3>
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusBadge(app.status)}`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {app.job?.location || "N/A"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Applied on {new Date(app.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {/* <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/jobs/${app.job?._id}`}>View Job</Link>
                          </Button>
                        </div> */}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Earnings Chart */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Monthly Earnings</h2>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex h-48 items-end justify-between gap-2">
                {earnings.map((month) => (
                  <div key={month.month} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg gradient-primary transition-all"
                      style={{ height: `${(month.amount / maxEarning) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{month.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { icon: Briefcase, label: "Browse Jobs", to: "/feed" },
                  { icon: FileText, label: "My Applications", to: "/my-applications" },
                  { icon: Award, label: "Update Profile", to: "/complete-profile" },
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

            {/* Profile Completion */}
            {/* <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Profile Strength</h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Complete your profile</span>
                  <span>75%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full">
                  <div className="h-2 bg-primary rounded-full w-3/4"></div>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/complete-profile">Complete Profile</Link>
              </Button>
            </div> */}

            {/* Available Credits */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Credits</h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary">{credits}</span>
                <IndianRupee className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Each job application costs 1 credit
              </p>
              <Button className="w-full" asChild>
                <Link to="/buy-credits">Buy More Credits</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}