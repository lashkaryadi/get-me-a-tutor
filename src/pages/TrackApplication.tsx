import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Building2,
  MapPin,
  Calendar,
  MessageCircle,
  Eye,
  ArrowRight,
  IndianRupee,
} from "lucide-react";

type ApplicationStatus = "applied" | "under_review" | "shortlisted" | "interview" | "offered" | "rejected";

interface Application {
  id: number;
  jobTitle: string;
  institute: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: ApplicationStatus;
  timeline: { step: string; date: string; completed: boolean; current?: boolean }[];
}

const applications: Application[] = [
  {
    id: 1,
    jobTitle: "Mathematics Tutor",
    institute: "ABC Academy",
    location: "Mumbai, Maharashtra",
    salary: "₹25,000 - ₹35,000/month",
    appliedDate: "Dec 18, 2024",
    status: "interview",
    timeline: [
      { step: "Application Submitted", date: "Dec 18, 2024", completed: true },
      { step: "Under Review", date: "Dec 19, 2024", completed: true },
      { step: "Shortlisted", date: "Dec 20, 2024", completed: true },
      { step: "Interview Scheduled", date: "Dec 25, 2024", completed: false, current: true },
      { step: "Offer", date: "", completed: false },
    ],
  },
  {
    id: 2,
    jobTitle: "Physics Faculty",
    institute: "XYZ Coaching",
    location: "Delhi, NCR",
    salary: "₹30,000 - ₹45,000/month",
    appliedDate: "Dec 15, 2024",
    status: "shortlisted",
    timeline: [
      { step: "Application Submitted", date: "Dec 15, 2024", completed: true },
      { step: "Under Review", date: "Dec 16, 2024", completed: true },
      { step: "Shortlisted", date: "Dec 22, 2024", completed: true, current: true },
      { step: "Interview Scheduled", date: "", completed: false },
      { step: "Offer", date: "", completed: false },
    ],
  },
  {
    id: 3,
    jobTitle: "English Trainer",
    institute: "Global Learning Center",
    location: "Bangalore, Karnataka",
    salary: "₹20,000 - ₹30,000/month",
    appliedDate: "Dec 10, 2024",
    status: "rejected",
    timeline: [
      { step: "Application Submitted", date: "Dec 10, 2024", completed: true },
      { step: "Under Review", date: "Dec 11, 2024", completed: true },
      { step: "Not Selected", date: "Dec 14, 2024", completed: true },
    ],
  },
];

const getStatusBadge = (status: ApplicationStatus) => {
  const styles: Record<ApplicationStatus, { bg: string; text: string; label: string }> = {
    applied: { bg: "bg-muted", text: "text-muted-foreground", label: "Applied" },
    under_review: { bg: "bg-warning/10", text: "text-warning", label: "Under Review" },
    shortlisted: { bg: "bg-primary/10", text: "text-primary", label: "Shortlisted" },
    interview: { bg: "bg-accent/10", text: "text-accent", label: "Interview" },
    offered: { bg: "bg-success/10", text: "text-success", label: "Offered" },
    rejected: { bg: "bg-destructive/10", text: "text-destructive", label: "Not Selected" },
  };
  return styles[status];
};

export default function TrackApplication() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Track Applications</h1>
          <p className="text-muted-foreground">Monitor the status of your job applications</p>
        </div>

        {/* Summary Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Applications", value: "3", icon: FileText, color: "primary" },
            { label: "Under Review", value: "0", icon: Clock, color: "warning" },
            { label: "Shortlisted", value: "2", icon: CheckCircle, color: "success" },
            { label: "Interviews", value: "1", icon: Calendar, color: "accent" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${stat.color}/10`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {applications.map((app) => {
            const statusBadge = getStatusBadge(app.status);
            return (
              <div key={app.id} className="rounded-2xl border border-border bg-card overflow-hidden">
                {/* Header */}
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary">
                      <Building2 className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-foreground">{app.jobTitle}</h2>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                      <p className="mb-2 text-primary">{app.institute}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {app.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {app.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Applied: {app.appliedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-t border-border bg-muted/30 p-6">
                  <h3 className="mb-4 text-sm font-semibold text-foreground">Application Timeline</h3>
                  <div className="relative flex items-center justify-between">
                    {app.timeline.map((step, index) => (
                      <div key={step.step} className="relative flex flex-1 flex-col items-center">
                        {/* Connector line */}
                        {index < app.timeline.length - 1 && (
                          <div
                            className={`absolute left-1/2 top-4 h-0.5 w-full ${
                              step.completed ? "bg-success" : "bg-border"
                            }`}
                          />
                        )}
                        
                        {/* Step circle */}
                        <div
                          className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                            step.completed
                              ? step.step.includes("Not Selected")
                                ? "bg-destructive"
                                : "bg-success"
                              : step.current
                              ? "bg-primary"
                              : "bg-muted"
                          }`}
                        >
                          {step.completed ? (
                            step.step.includes("Not Selected") ? (
                              <XCircle className="h-4 w-4 text-destructive-foreground" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-success-foreground" />
                            )
                          ) : step.current ? (
                            <Clock className="h-4 w-4 text-primary-foreground" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                          )}
                        </div>

                        {/* Step label */}
                        <div className="mt-2 text-center">
                          <div className={`text-xs font-medium ${step.current ? "text-primary" : "text-foreground"}`}>
                            {step.step}
                          </div>
                          {step.date && (
                            <div className="text-xs text-muted-foreground">{step.date}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">No Applications Yet</h2>
            <p className="mb-6 text-muted-foreground">Start applying to jobs to track your applications here</p>
            <Button asChild>
              <Link to="/feed">
                Browse Jobs
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
