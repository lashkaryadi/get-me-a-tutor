import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Search,
  MapPin,
  Star,
  Filter,
  SlidersHorizontal,
  BookOpen,
  Clock,
  IndianRupee,
  Heart,
  ChevronDown,
  X,
} from "lucide-react";
import apiClient from "@/api/apiClient";
import { useApi } from "@/hooks/useApi";
import { useToast } from "@/components/ui/use-toast";

const subjects = [
  "All Subjects",
  "Mathematics",
  "Science",
  "English",
  "Programming",
  "Languages",
  "Music",
  "Art",
  "Test Prep",
];

const tutors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    subject: "Mathematics",
    specialization: "Calculus, Algebra, Statistics",
    rating: 4.9,
    reviews: 234,
    hourlyRate: 800,
    experience: "8 years",
    location: "Mumbai, India",
    avatar: "PS",
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "Rahul Verma",
    subject: "Physics",
    specialization: "JEE Main, NEET Physics",
    rating: 4.8,
    reviews: 189,
    hourlyRate: 600,
    experience: "5 years",
    location: "Delhi, India",
    avatar: "RV",
    verified: true,
    featured: false,
  },
  {
    id: 3,
    name: "Anjali Patel",
    subject: "English",
    specialization: "IELTS, TOEFL, Academic Writing",
    rating: 4.9,
    reviews: 312,
    hourlyRate: 700,
    experience: "6 years",
    location: "Bangalore, India",
    avatar: "AP",
    verified: true,
    featured: true,
  },
  {
    id: 4,
    name: "Vikram Singh",
    subject: "Programming",
    specialization: "Python, JavaScript, Data Science",
    rating: 4.7,
    reviews: 156,
    hourlyRate: 900,
    experience: "4 years",
    location: "Hyderabad, India",
    avatar: "VS",
    verified: true,
    featured: false,
  },
  {
    id: 5,
    name: "Neha Gupta",
    subject: "Chemistry",
    specialization: "Organic Chemistry, NEET",
    rating: 4.8,
    reviews: 198,
    hourlyRate: 650,
    experience: "7 years",
    location: "Pune, India",
    avatar: "NG",
    verified: true,
    featured: false,
  },
  {
    id: 6,
    name: "Arjun Reddy",
    subject: "Music",
    specialization: "Guitar, Piano, Music Theory",
    rating: 4.9,
    reviews: 87,
    hourlyRate: 500,
    experience: "10 years",
    location: "Chennai, India",
    avatar: "AR",
    verified: true,
    featured: true,
  },
];

interface Job {
  id: string; // ADD THIS
  title: string;
  description: string;
  location: string;
  salary: string;
  type: string; // ADD THIS
  requirements: string[];
  urgent: boolean; // ADD THIS
  institute: string; // ADD THIS
  posted: string; // ADD THIS (date/time string)
}

export default function Feed() {
  const { data: jobs, loading, error } = useApi<Job[]>("/jobs");
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"tutors" | "jobs">("tutors");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [hasShownError, setHasShownError] = useState(false);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error ❌",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  // // ADD this function to fetch jobs
  // const fetchJobs = async () => {
  //   try {
  //     const response = await apiClient.get('/jobs');
  //     setJobs(response.data);
  //   } catch (error) {
  //     console.error("Error fetching jobs:", error);
  //     // Only show toast ONCE, not during render
  //     if (!hasShownError) {
  //       toast({
  //         title: "Error",
  //         description: "Failed to load jobs. Please try again.",
  //         variant: "destructive",
  //       });
  //       setHasShownError(true);
  //     }
  //   }
  // };

  // // Call fetchJobs in useEffect
  // useEffect(() => {
  //   fetchJobs();
  // }, [hasShownError]);

  if (loading) return <div>Loading jobs...</div>;

  // if (error) {
  //   toast({
  //     title: "Error ❌",
  //     description: error,
  //     variant: "destructive",
  //   });
  //   return <div>Failed to load jobs</div>;
  // }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Discover
          </h1>
          <p className="text-muted-foreground">
            Find the perfect tutor or explore job opportunities
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tutors, subjects, or skills..."
                className="pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Location */}
            <div className="relative flex-1 lg:max-w-xs">
              <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Location" className="pl-12" />
            </div>

            {/* Filter Toggle */}
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </Button>

            <Button>
              <Search className="h-5 w-5" />
              Search
            </Button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Subject:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {subjects.slice(0, 5).map((subject) => (
                      <button
                        key={subject}
                        onClick={() => setSelectedSubject(subject)}
                        className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                          selectedSubject === subject
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("tutors")}
            className={`relative px-6 py-3 text-sm font-semibold transition-colors ${
              activeTab === "tutors"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tutors
            {activeTab === "tutors" && (
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`relative px-6 py-3 text-sm font-semibold transition-colors ${
              activeTab === "jobs"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Job Listings
            {activeTab === "jobs" && (
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
            )}
          </button>
        </div>

        {/* Content */}
        {activeTab === "tutors" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor) => (
              <Link
                key={tutor.id}
                to={`/tutor/${tutor.id}`}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary text-lg font-bold text-primary-foreground">
                        {tutor.avatar}
                      </div>
                      {tutor.verified && (
                        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-foreground">
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary">
                        {tutor.name}
                      </h3>
                      <p className="text-sm text-primary">{tutor.subject}</p>
                    </div>
                  </div>
                  <button
                    aria-label="Add to favourites"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                {/* Specialization */}
                <p className="mb-4 text-sm text-muted-foreground">
                  {tutor.specialization}
                </p>

                {/* Stats */}
                <div className="mb-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-medium text-foreground">
                      {tutor.rating}
                    </span>
                    <span>({tutor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {tutor.experience}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {tutor.location.split(",")[0]}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="text-lg font-bold text-foreground">
                    ₹{tutor.hourlyRate}
                    <span className="text-sm font-normal text-muted-foreground">
                      /hour
                    </span>
                  </div>
                  <Button size="sm">View Profile</Button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {jobs?.map((job) => (
              <div
                key={job.id}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h3>
                      <Link
                        to={`/apply/${job.id}`}
                        className="font-semibold text-foreground group-hover:text-primary"
                      >
                        {job.title}
                      </Link>
                    </h3>
                    {job.urgent && (
                      <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
                        Urgent
                      </span>
                    )}
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {job.type}
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {job.institute}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.posted}
                    </span>
                  </div>
                </div>
                <Button asChild>
                  <Link to={`/apply/${job.id}`}>Apply Now</Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
