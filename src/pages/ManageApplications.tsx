import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApi } from "@/hooks/useApi";
import { useMutation } from "@/hooks/useMutation";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Check,
  X,
  Clock,
  Download,
  Mail,
  Phone,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Applicant {
  _id: string;
  tutor: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  job: {
    title: string;
  };
  experience: string;
  currentLocation: string;
  expectedSalary: string;
  message: string;
  resumeUrl: string;
  status: "pending" | "shortlisted" | "rejected" | "selected";
  createdAt: string;
}

interface Job {
  title: string;
}

export default function ManageApplications() {
  const { jobId } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch job details and applications separately
  const { data } = useApi<{ success: boolean; job: Job }>(
    jobId ? `/jobs/${jobId}` : ""
  );

  const job = data?.job;
  const { data: response, loading } = useApi<{
    success: boolean;
    applications: Applicant[];
  }>(jobId ? `/applications/job/${jobId}?r=${refreshKey}` : "");
  const applications = response?.applications || [];

  // Mutation to update status
  const { mutate: updateStatus, isLoading: isUpdating } = useMutation({
    successMsg: "Status updated successfully",
    onSuccess: () => setRefreshKey((prev) => prev + 1),
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateStatus("PATCH", `/applications/${id}/status`, {
      status: newStatus,
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!jobId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Manage Applications</h1>
          <p className="text-muted-foreground mb-6">
            Please select a job from the dashboard to view its applications.
          </p>
          <Button asChild>
            <Link to="/institute/dashboard">Go to Dashboard</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Manage Applications</h1>
              <p className="text-muted-foreground">
                Reviewing applications for{" "}
                <span className="font-medium text-foreground">
                  {job?.title || "..."}
                </span>
              </p>
            </div>
            <div className="bg-muted px-4 py-2 rounded-lg text-sm font-medium">
              Total Applications: {applications?.length || 0}
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : applications?.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl border border-border">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">
                No applications received yet
              </h3>
              <p className="text-muted-foreground">
                Once tutors apply to your jobs, they will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications?.map((app) => (
                <div
                  key={app._id}
                  className={`bg-card rounded-xl border transition-all ${
                    expandedId === app._id
                      ? "border-primary ring-1 ring-primary"
                      : "border-border"
                  }`}
                >
                  {/* Header Row */}
                  <div
                    className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                    onClick={() => toggleExpand(app._id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {app.tutor?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {app.tutor?.name || "Unknown Tutor"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Applied for{" "}
                          <span className="font-medium text-foreground">
                            {job?.title}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium border capitalize
                        ${
                          app.status === "selected"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : app.status === "shortlisted"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {app.status}
                      </div>
                      {expandedId === app._id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedId === app._id && (
                    <div className="px-4 pb-6 pt-2 border-t border-border">
                      <div className="grid md:grid-cols-3 gap-6 mt-4">
                        {/* Contact & Info */}
                        <div className="space-y-4 text-sm">
                          <h4 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                            Candidate Details
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`mailto:${app.tutor?.email}`}
                                className="hover:underline"
                              >
                                {app.tutor?.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`tel:${app.tutor?.phone}`}
                                className="hover:underline"
                              >
                                {app.tutor?.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              {app.experience} Experience
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">₹</span>
                              Expected: {app.expectedSalary}
                            </div>
                          </div>

                          {app.resumeUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full mt-2"
                              onClick={() =>
                                window.open(app.resumeUrl, "_blank")
                              }
                            >
                              <Download className="mr-2 h-4 w-4" /> Download
                              Resume
                            </Button>
                          )}
                        </div>

                        {/* Cover Letter */}
                        <div className="md:col-span-2 space-y-2">
                          <h4 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                            Cover Letter
                          </h4>
                          <div className="bg-muted/30 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap">
                            {app.message || "No cover letter provided."}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-4 border-t border-border border-dashed">
                        <span className="text-sm text-muted-foreground mr-auto">
                          Applied on{" "}
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(app._id, "rejected")
                          }
                          disabled={isUpdating || app.status === "rejected"}
                        >
                          <X className="mr-2 h-4 w-4 text-red-500" /> Reject
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(app._id, "shortlisted")
                          }
                          disabled={isUpdating || app.status === "shortlisted"}
                        >
                          <Clock className="mr-2 h-4 w-4 text-blue-500" />{" "}
                          Shortlist
                        </Button>

                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusChange(app._id, "selected")
                          }
                          disabled={isUpdating || app.status === "selected"}
                        >
                          <Check className="mr-2 h-4 w-4" /> Select Candidate
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
