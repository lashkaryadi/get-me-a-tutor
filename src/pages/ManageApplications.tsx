import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApi } from "@/hooks/useApi";
import { useMutation } from "@/hooks/useMutation";
import { Button } from "@/components/ui/button";
import { getDashboardRoute } from "@/utils/navigation";
import ApplicantHeader from "@/components/applications/ApplicantHeader";
import ApplicantDetails from "@/components/applications/ApplicantDetails";
import ApplicantActions from "@/components/applications/ApplicantActions";
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

  // Fetch job details and applications separately
  const { data } = useApi<{ success: boolean; job: Job }>(
    jobId ? `/jobs/${jobId}` : null as any
  );

  const job = data?.job;
  const {
    data: response,
    loading,
    refetch,
    error: applicationsError
  } = useApi<{ success: boolean; applications: Applicant[] }>(
    jobId ? `/applications/job/${jobId}` : null as any
  );


  const applications = response?.applications || [];

  // Handle backend error silently if Institution is not defined
  if (applicationsError) {
    console.warn("Silently handling backend error for job applications:", applicationsError);
  }

  const { mutate: updateStatus, isLoading: isUpdating } = useMutation({
    successMsg: "Status updated successfully",
    errorMsg: "Failed to update status. Please try again later.",
    onSuccess: () => {
      // Add a small delay to ensure the backend has processed the update
      setTimeout(() => {
        refetch();
      }, 500);
    },
    onError: (error: any) => {
      console.warn("Status update error (likely CORS issue):", error);
      // Check if it's a CORS/network error and provide more specific feedback
      if (error?.code === 'ERR_NETWORK' || error?.message?.includes('Network Error')) {
        console.error("CORS or network issue detected. Please contact admin to check server configuration.");
      }
    }
  });


  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleStatusChange = async (
    applicationId: string,
    status: "rejected" | "shortlisted" | "selected"
  ) => {
    await updateStatus(
      "PATCH",
      `/applications/${applicationId}/status`,
      { status }
    );
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
            <Link to={(() => {
              // Get user role from localStorage to determine redirect
              const rawUser = localStorage.getItem("user");
              if (rawUser) {
                const user = JSON.parse(rawUser);
                return getDashboardRoute(user.role);
              } else {
                return "/institute/dashboard"; // fallback for institute role
              }
            })()}>
              Go to Dashboard
            </Link>
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
                  <ApplicantHeader
                    app={{
                      ...app,
                      job: { title: job?.title || "" } // Pass job title to the component
                    }}
                    expanded={expandedId === app._id}
                    onToggle={() => toggleExpand(app._id)}
                  />

                  {/* Expanded Details */}
                  {expandedId === app._id && (
                    <>
                      <ApplicantDetails app={app} />

                      {/* Actions */}
                      <ApplicantActions
                        disabled={isUpdating || app.status === "selected" || app.status === "rejected" || app.status === "shortlisted"}
                        onReject={() => handleStatusChange(app._id, "rejected")}
                        onShortlist={() => handleStatusChange(app._id, "shortlisted")}
                        onSelect={() => handleStatusChange(app._id, "selected")}
                        appliedDate={app.createdAt}
                      />
                    </>
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

