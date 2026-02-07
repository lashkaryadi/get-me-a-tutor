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
  Trash2,
} from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useMutation } from "@/hooks/useMutation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMemo } from "react";
import { useCredit } from "@/context/CreditContext";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

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
  const { credits } = useCredit();
  const { data, loading, refetch } = useApi<{ success: boolean; jobs: any[] }>("/jobs/my");

  const { toast } = useToast();
  const { mutate: deleteJobMutation } = useMutation({
    successMsg: "Job deleted successfully",
    errorMsg: "Failed to delete job",
    onSuccess: () => refetch(),
  });

  const handleDelete = (jobId: string) => {
    toast({
      title: "Are you sure?",
      description: "This action cannot be undone.",
      variant: "destructive",
      action: (
        <ToastAction
          altText="Delete"
          onClick={() => deleteJobMutation("DELETE", `/jobs/${jobId}`)}
        >
          Delete
        </ToastAction>
      ),
    });
  };

  const jobs = useMemo(
    () => (Array.isArray(data?.jobs) ? data.jobs : []),
    [data?.jobs]
  );


  const { data: appsData, error: appsError } = useApi<{ success: boolean; applications: any[] }>(
    "/applications/my-received"
  );
  const applications = useMemo(
    () => (Array.isArray(appsData?.applications) ? appsData.applications : []),
    [appsData?.applications]
  );

  // Handle backend error silently - if there's an error, show empty array
  const recentApplications = useMemo(() => {
    if (appsError) {
      console.warn("Silently handling backend error for received applications:", appsError);
      return []; // Return empty array if there's an error
    }
    return applications.slice(0, 4);
  }, [applications, appsError]);


  const maxApplications = Math.max(...analytics.map((a) => a.applications));

  const stats = useMemo(() => {
    const activeJobs = jobs.filter(j => j.status === "active");

    return [
      {
        label: "Active Jobs",
        value: activeJobs.length.toString(),
        icon: Briefcase,
        trend: "Live",
        color: "primary",
      },
      {
        label: "Total Applications",
        value: applications.length.toString(),
        icon: FileText,
        trend: "All time",
        color: "success",
      },
      {
        label: "Profile Views",
        value: "—",
        icon: Eye,
        trend: "Coming soon",
        color: "warning",
      },
      {
        label: "Hired Tutors",
        value: "—",
        icon: Users,
        trend: "Coming soon",
        color: "accent",
      },
    ];
  }, [jobs, applications]);


  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Institute Dashboard</h1>
            <p className="text-muted-foreground">Manage your job postings and applications</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="credit-pill bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 shadow-sm"
            >
              Credits: <span className="font-bold">{credits}</span>
            </motion.div>
            <Button asChild size="lg" className="shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
              <Link to="/post-job">
                <Plus className="h-5 w-5 mr-2" />
                Post New Job
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="h-full">
                <div className="rounded-2xl border border-border bg-card p-6 h-full shadow-sm hover:shadow-lg transition-all hover:border-primary/20">
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${stat.color}/10`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                    </div>
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="mt-2 text-xs text-success bg-success/10 inline-block px-2 py-0.5 rounded-full">{stat.trend}</div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Jobs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Active Job Postings</h2>
                <Button variant="outline" size="sm" asChild className="hover:bg-primary/5 hover:text-primary hover:border-primary/30">
                  <Link to="/institute/jobs">View All</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {jobs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No active jobs found.</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link to="/post-job" className="text-primary">Post your first job</Link>
                    </Button>
                  </div>
                ) : (
                  jobs.map((job, index) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="font-semibold text-foreground text-lg">{job.title}</h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${job.status === "active"
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning"
                              }`}
                          >
                            {job.status === "active" ? "Active" : "Paused"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-0.5 rounded-md">
                            <FileText className="h-3.5 w-3.5" />
                            {job.applicationsCount ?? 0} applications
                          </span>
                          {/* <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {job.views ?? 0} views
                            </span> */}
                          <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-0.5 rounded-md">
                            <Clock className="h-3.5 w-3.5" />
                            {job.deadline}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild className="hover:border-primary/50 hover:bg-primary/5">
                          <Link to={`/manage-applications/${job._id}`}>View Applications</Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(job._id)}
                          className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-200 hover:border-red-500 transition-all"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Analytics Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Weekly Applications</h2>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex h-48 items-end justify-between gap-2">
                {analytics.map((day, index) => (
                  <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.applications / maxApplications) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                      className="w-full rounded-t-lg gradient-primary opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <span className="text-xs text-muted-foreground font-medium">{day.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>



          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h2 className="mb-4 text-xl font-semibold text-foreground">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { icon: Plus, label: "Post New Job", to: "/post-job" },
                  { icon: Users, label: "View Applications", to: "/institute/jobs" },
                ].map((action) => (
                  <Link
                    key={action.label}
                    to={action.to}
                    className="flex items-center gap-3 rounded-xl p-3 text-muted-foreground transition-all hover:bg-primary/5 hover:text-primary hover:pl-4 border border-transparent hover:border-primary/10"
                  >
                    <action.icon className="h-5 w-5" />
                    <span>{action.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Available Credits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.02} transitionSpeed={2000}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-125 duration-500" />

                  <h2 className="mb-4 text-xl font-semibold text-foreground relative z-10">Credits</h2>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="text-4xl font-bold text-primary">{credits}</span>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <IndianRupee className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 relative z-10">
                    Each job posting costs 1 credit.
                  </p>
                  <Button className="w-full relative z-10 shadow-md shadow-primary/20" asChild>
                    <Link to="/buy-credits">Buy More Credits</Link>
                  </Button>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
