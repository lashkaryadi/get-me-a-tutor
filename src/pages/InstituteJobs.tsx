import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApi } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Plus,
  Calendar
} from "lucide-react";

interface Job {
  _id: string;
  title: string;
  location: string;
  type: string;
  status: 'active' | 'closed' | 'paused';
  createdAt: string;
}

interface JobsResponse {
  success: boolean;
  jobs: Job[];
}

export default function InstituteJobs() {
  // Fetch jobs posted by the logged-in institute
  // Assuming the backend returns { success: true, jobs: [...] }
  const { data: response, loading } = useApi<JobsResponse>("/jobs/my");
  const jobs = response?.jobs || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">My Job Postings</h1>
              <p className="text-muted-foreground">Manage your posted jobs and view applications</p>
            </div>
            <Button asChild>
              <Link to="/post-job">
                <Plus className="mr-2 h-4 w-4" /> Post New Job
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : !jobs || jobs.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl border border-border">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No jobs posted yet</h3>
              <p className="text-muted-foreground mb-4">Create your first job posting to start receiving applications.</p>
              <Button asChild>
                <Link to="/post-job">Post a Job</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="bg-card rounded-xl border border-border p-6 transition-all hover:shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize
                          ${job.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 
                            'bg-gray-100 text-gray-700 border-gray-200'}`}>
                          {job.status}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          Posted on {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button variant="outline" asChild>
                        <Link to={`/edit-job/${job._id}`}>Edit</Link>
                      </Button>
                      <Button asChild>
                        <Link to={`/manage-applications/${job._id}`}>
                          <Users className="mr-2 h-4 w-4" />
                          View Applications
                        </Link>
                      </Button>
                    </div>
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