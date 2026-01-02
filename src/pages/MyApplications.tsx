import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApi } from "@/hooks/useApi";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText,
  ArrowRight
} from "lucide-react";

interface Application {
  id: string;
  _id: string;
  job: {
    _id: string;
    title: string;
    location: string;
    institution: string;
  };
  createdAt: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'selected';
}

export default function MyApplications() {
  const { data: response, loading } = useApi<{ success: boolean; applications: Application[] }>("/applications/my");
  const applications = response?.applications || [];

  const getStatusBadge = (status: string) => {
    const styles = {
      selected: "bg-green-100 text-green-700 border-green-200",
      shortlisted: "bg-blue-100 text-blue-700 border-blue-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
    
    const icons = {
      selected: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
      shortlisted: <Clock className="h-3.5 w-3.5 mr-1" />,
      rejected: <XCircle className="h-3.5 w-3.5 mr-1" />,
      pending: <Clock className="h-3.5 w-3.5 mr-1" />,
    };

    const key = status as keyof typeof styles;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[key] || styles.pending}`}>
        {icons[key] || icons.pending}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Applications</h1>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : applications?.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No applications yet</h3>
              <p className="text-muted-foreground mb-4">Start applying to jobs to see them here.</p>
              <Link to="/feed" className="text-primary hover:underline">Browse Jobs</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications?.map((app) => (
                <div key={app._id || app.id} className="bg-card rounded-xl border border-border p-6 transition-all hover:shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between md:justify-start md:items-center gap-3">
                        <h3 className="font-semibold text-lg">{app.job?.title || "Job Unavailable"}</h3>
                        {getStatusBadge(app.status)}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="h-4 w-4" />
                          {/* Institute name would require population or storing in app */}
                          Institute
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {app.job?.location || "N/A"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
Applied on {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <Link 
                      to={`/jobs/${app.job?._id}`}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border hover:bg-accent text-sm font-medium transition-colors"
                    >
                      View Job <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
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