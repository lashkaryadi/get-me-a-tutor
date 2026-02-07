
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApi } from "@/hooks/useApi";
import {
    MapPin,
    Clock,
    IndianRupee,
    Building2,
    ArrowLeft,
    Briefcase,
    Calendar,
    Share2,
    User
} from "lucide-react";

interface Job {
    _id: string;
    title: string;
    description: string;
    location: string;
    salary?: number;
    jobType: string;
    createdAt: string;
    subjects?: string[];
    postedByRole: "institute" | "parent";
    postedBy?: {
        name: string;
    };
    institution?: {
        _id: string;
        institutionName: string;
        city?: string;
        logo?: string;
        about?: string;
    };
}

export default function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useApi<{ success: boolean; job: Job }>(`/jobs/${id}`);
    const job = data?.job;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isTutor = user?.role === "tutor";

    if (loading) return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <Footer />
        </div>
    );

    if (error || !job) return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
                <p className="text-muted-foreground mb-6">The job posting you are looking for does not exist or has been removed.</p>
                <Button asChild>
                    <Link to="/feed">Browse Jobs</Link>
                </Button>
            </div>
            <Footer />
        </div>
    );

    const isInstituteJob = job.postedByRole === "institute" && job.institution;
    const posterName = isInstituteJob ? job.institution?.institutionName : (job.postedBy?.name || "Parent");

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <Link to="/feed" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Jobs
                </Link>

                {/* Job Header */}
                <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                {isInstituteJob ? <Building2 className="h-8 w-8" /> : <User className="h-8 w-8" />}
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{job.title}</h1>
                                <div className="text-lg text-muted-foreground font-medium mb-4">{posterName}</div>

                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {job.location}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full">
                                        <Briefcase className="h-3.5 w-3.5" />
                                        {job.jobType}
                                    </span>
                                    {job.salary && (
                                        <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full">
                                            <IndianRupee className="h-3.5 w-3.5" />
                                            ₹{job.salary}/month
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full">
                                        <Calendar className="h-3.5 w-3.5" />
                                        Posted {new Date(job.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                            {isTutor ? (
                                <Button size="lg" className="w-full text-lg" asChild>
                                    <Link to={`/apply/${job._id}`}>
                                        Apply Now
                                    </Link>
                                </Button>
                            ) : (
                                !user.role && <Button size="lg" className="w-full" asChild>
                                    <Link to="/login">Login to Apply</Link>
                                </Button>
                            )}
                            {/* <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button> */}
                        </div>
                    </div>
                </div>

                {/* Job Description */}
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-8">
                        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                            <h2 className="text-xl font-bold mb-4">Job Description</h2>
                            <div className="prose prose-sm md:prose-base text-muted-foreground whitespace-pre-wrap">
                                {job.description}
                            </div>
                        </div>

                        {/* Subjects */}
                        {job.subjects && job.subjects.length > 0 && (
                            <div className="rounded-2xl border border-border bg-card p-6">
                                <h2 className="text-xl font-bold mb-4">Subjects</h2>
                                <div className="flex flex-wrap gap-2">
                                    {job.subjects.map((subject) => (
                                        <span
                                            key={subject}
                                            className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary capitalize"
                                        >
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="md:col-span-1 space-y-6">
                        <div className="rounded-2xl border border-border bg-card p-6">
                            <h3 className="font-semibold text-lg mb-4">About {isInstituteJob ? "Institution" : "Parent"}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {isInstituteJob ? (job.institution?.about || "No specific details available for this institution.") : "This job is posted by an individual parent seeking a tutor."}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {isInstituteJob ? (job.institution?.city || job.location) : job.location}
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
