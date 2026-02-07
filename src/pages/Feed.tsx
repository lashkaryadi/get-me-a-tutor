import apiClient from "@/api/apiClient";
import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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

interface Tutor {
  _id: string;
  name: string;
  subject: string;
  specialization: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  experience: string;
  city?: string;
  avatar: string;
  verified: boolean;
}


interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary?: number;
  jobType: string;
  createdAt: string;
  institution: {
    institutionName: string;
    city?: string;
  };
}
interface JobsResponse {
  success: boolean;
  results: number;
  jobs: Job[];
}

export default function Feed() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchQuery = searchParams.get('q') || '';
  const initialSubject = searchParams.get('subject') || 'All Subjects';
  const initialLocation = searchParams.get('location') || '';

  // Public endpoint: GET /jobs/alljobs (matches backend contract)
  // Build API URL with query parameters
  const buildJobsApiUrl = (q: string, subject: string, location: string) => {
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (subject && subject !== 'All Subjects') params.append('subject', subject);
    if (location) params.append('location', location);
    return `/jobs/alljobs${params.toString() ? '?' + params.toString() : ''}`;
  };

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [locationQuery, setLocationQuery] = useState(initialLocation);

  const [apiUrl, setApiUrl] = useState(buildJobsApiUrl(initialSearchQuery, initialSubject, initialLocation));
  const { data, loading, error, refetch } = useApi<JobsResponse>(apiUrl);
  const jobs = Array.isArray(data?.jobs) ? data.jobs : [];

  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"tutors" | "jobs">("jobs"); // Changed default to jobs for better UX
  // Public endpoint: GET /profile/public
  const {
    data: teacherResponse,
    loading: teacherLoading,
    error: teacherError,
  } = useApi<{ teachers: Tutor[] }>("/profile/public");

  const tutors: Tutor[] = teacherResponse?.teachers ?? [];

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

  // Update URL when search parameters change (debounced effect ideally, but direct update for now)
  useEffect(() => {
    const params: { [key: string]: string } = {};

    if (searchQuery.trim()) params.q = searchQuery.trim();
    if (selectedSubject && selectedSubject !== 'All Subjects') params.subject = selectedSubject;
    if (locationQuery.trim()) params.location = locationQuery.trim();

    setSearchParams(params);
  }, [searchQuery, selectedSubject, locationQuery, setSearchParams]);

  const handleSearch = () => {
    const newUrl = buildJobsApiUrl(searchQuery.trim(), selectedSubject, locationQuery.trim());
    setApiUrl(newUrl);
  };

  if (teacherLoading) return <div className="p-8">Loading tutors...</div>;
  if (teacherError)
    return <div className="p-8 text-red-500">{teacherError}</div>;
  if (loading) return <div className="p-8">Loading jobs...</div>; // Keep loading UX consistent
  if (error) return <div className="p-8 text-red-500">Something went wrong</div>;


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Search Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Discover
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Find the perfect tutor or explore job opportunities
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 sm:mb-8 rounded-2xl border border-border bg-card p-3 sm:p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:left-4 sm:h-5 sm:w-5" />
              <Input
                placeholder="Search tutors, subjects, or skills..."
                className="pl-10 sm:pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:left-4 sm:h-5 sm:w-5" />
              <Input
                placeholder="Location (City, State)"
                className="pl-10 sm:pl-12"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>

            <div className="flex gap-3">
              {/* Filter Toggle */}
              <Button
                variant={showFilters ? "default" : "outline"}
                className="flex-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="ml-2">Filters</span>
              </Button>

              <Button className="flex-1" onClick={handleSearch}>
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="ml-2">Search</span>
              </Button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground sm:text-sm">
                    Subject:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {subjects.slice(0, 5).map((subject) => (
                      <button
                        key={subject}
                        onClick={() => {
                          setSelectedSubject(subject);
                          // Trigger search immediately on filter click for better UX
                          const params = new URLSearchParams();
                          if (searchQuery.trim()) params.append('q', searchQuery.trim());
                          if (subject && subject !== 'All Subjects') params.append('subject', subject);
                          if (locationQuery.trim()) params.append('location', locationQuery.trim());

                          setApiUrl(`/jobs/alljobs${params.toString() ? '?' + params.toString() : ''}`);
                        }}
                        className={`rounded-full px-3 py-1 text-xs transition-colors sm:px-4 sm:py-1.5 sm:text-sm ${selectedSubject === subject
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
        <div className="mb-4 sm:mb-6 flex gap-1 sm:gap-2 border-b border-border overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("tutors")}
            className={`relative px-4 py-2 text-xs font-semibold sm:px-6 sm:py-3 sm:text-sm transition-colors min-w-max ${activeTab === "tutors"
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
            className={`relative px-4 py-2 text-xs font-semibold sm:px-6 sm:py-3 sm:text-sm transition-colors min-w-max ${activeTab === "jobs"
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
          <div className="grid gap-4 sm:gap-6">
            {tutors.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No tutors available</p>
            ) : (
              tutors.map((tutor) => (
                <Link
                  key={tutor._id}
                  to={`/tutor/${tutor._id}`}
                  className="group rounded-2xl border border-border bg-card p-4 sm:p-6 transition-all hover:border-primary hover:shadow-lg block"
                >
                  {/* Header */}
                  <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-base font-bold text-primary-foreground sm:h-14 sm:w-14 sm:text-lg">
                          {tutor.avatar}
                        </div>
                        {tutor.verified && (
                          <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-success text-success-foreground sm:h-5 sm:w-5">
                            <svg
                              className="h-2 w-2 sm:h-3 sm:w-3"
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
                        <h3 className="font-semibold text-foreground group-hover:text-primary text-sm sm:text-base">
                          {tutor.name}
                        </h3>
                        <p className="text-xs text-primary sm:text-sm">{tutor.subject}</p>
                      </div>
                    </div>
                    <button
                      aria-label="Add to favourites"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="text-muted-foreground hover:text-destructive self-start"
                    >
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>

                  {/* Specialization */}
                  <p className="mb-3 text-xs text-muted-foreground sm:mb-4 sm:text-sm">
                    {tutor.specialization}
                  </p>

                  {/* Stats */}
                  <div className="mb-3 flex flex-wrap gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-warning text-warning" />
                      <span className="font-medium text-foreground">
                        {tutor.rating}
                      </span>
                      <span>({tutor.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      {tutor.experience}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                      {tutor.city ?? "—"}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-border pt-3 sm:pt-4">
                    <div className="text-base font-bold text-foreground sm:text-lg">
                      ₹{tutor.hourlyRate}
                      <span className="text-xs font-normal text-muted-foreground sm:text-sm">
                        /hour
                      </span>
                    </div>
                    <Button size="sm">View Profile</Button>
                  </div>
                </Link>
              )))}
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No jobs available</p>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:p-6 hover:border-primary hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-base font-semibold text-foreground sm:text-lg">
                      {job.title}
                    </h3>

                    <p className="text-xs text-muted-foreground sm:text-sm">
                      {job.institution?.institutionName}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                        {job.location}
                      </span>

                      {job.salary && (
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4" />
                          {job.salary}
                        </span>
                      )}

                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Button asChild>
                    <Link to={`/apply/${job._id}`}>Apply Now</Link>
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
