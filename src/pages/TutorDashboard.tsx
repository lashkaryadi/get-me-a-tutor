import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCredit } from "@/context/CreditContext";
import {
  Briefcase,
  FileText,
  MapPin,
  IndianRupee,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Award
} from "lucide-react";
import { useApi } from "@/hooks/useApi";

export default function TutorDashboard() {
  const { credits } = useCredit();
  const { data: profileData, loading: profileLoading } = useApi("/profile/teacher/me");

  // Private endpoint: GET /applications/my (requires Credit, tutor only)
  const { data: applicationsData, loading: applicationsLoading } = useApi<{
    success: boolean;
    applications: any[];
  }>("/applications/my");

  const recentApplications = Array.isArray(applicationsData?.applications)
    ? applicationsData.applications.slice(0, 5)
    : [];

  const applicationsCount = applicationsData?.applications?.length ?? 0;

  if (profileLoading || applicationsLoading) return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tutor Dashboard</h1>
            <p className="text-muted-foreground">Manage your job applications and profile</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="credit-pill bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Credits: {credits}
            </div>
            <Button asChild size="lg">
              <Link to="/feed">
                <Briefcase className="h-5 w-5 mr-2" />
                Browse Jobs
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid - Real Data Only */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{applicationsCount}</div>
            <div className="text-sm text-muted-foreground">Total Applications</div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <IndianRupee className="h-6 w-6 text-accent" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{credits}</div>
            <div className="text-sm text-muted-foreground">Available Credits</div>
          </div>
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
                  <div className="text-center py-12 border border-dashed border-muted-foreground/30 rounded-xl">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No applications yet</h3>
                    <p className="text-muted-foreground mb-4">Start applying to jobs to see them here.</p>
                    <Button asChild>
                      <Link to="/feed">Browse Jobs</Link>
                    </Button>
                  </div>
                ) : (
                  recentApplications.map((app) => {
                    const getStatusBadge = (status: string) => {
                      const styles: { [key: string]: string } = {
                        selected: "bg-green-100 text-green-700 border-green-200",
                        shortlisted: "bg-blue-100 text-blue-700 border-blue-200",
                        rejected: "bg-red-100 text-red-700 border-red-200",
                        applied: "bg-yellow-100 text-yellow-700 border-yellow-200",
                        pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
                      };
                      return styles[status] || styles.pending;
                    };

                    const getStatusIcon = (status: string) => {
                      switch (status) {
                        case 'selected': return <CheckCircle className="h-3 w-3 mr-1" />;
                        case 'rejected': return <XCircle className="h-3 w-3 mr-1" />;
                        default: return <Clock className="h-3 w-3 mr-1" />;
                      }
                    }

                    return (
                      <div
                        key={app._id || app.id}
                        className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-muted/5 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="font-semibold text-foreground">{app.job?.title || "Job Unavailable"}</h3>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(app.status)}`}>
                              {getStatusIcon(app.status)}
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {app.job?.location || "N/A"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(app.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/jobs/${app.job?._id}`}>View Job</Link>
                        </Button>
                      </div>
                    );
                  })
                )}
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
                  // { icon: Award, label: "Update Profile", to: "/complete-profile" }, // temporary hide if page is not ready
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