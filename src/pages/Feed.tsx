import apiClient from "@/api/apiClient";
import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
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
  Briefcase,
  User,
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

  // Loading Component
  if (teacherLoading || loading) return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
      <Footer />
    </div>
  );

  if (teacherError)
    return <div className="p-8 text-red-500">{teacherError}</div>;
  if (error) return <div className="p-8 text-red-500">Something went wrong</div>;


  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
            Discover <span className="text-primary">Opportunities</span>
          </h1>
          <p className="text-muted-foreground sm:text-lg">
            Find the perfect tutor or check out the latest job openings.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-sm relative overflow-hidden"
        >
          {/* Decorative bg gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

          <div className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Search Input */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search tutors, subjects, or skills..."
                  className="pl-12 h-12 rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all"
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
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Location (City, State)"
                  className="pl-12 h-12 rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex gap-4">
              {/* Filter Toggle */}
              <Button
                variant={showFilters ? "secondary" : "outline"}
                className="flex-1 h-11 rounded-xl"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                <motion.span
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </Button>

              <Button className="flex-1 h-11 rounded-xl text-base shadow-lg shadow-primary/20 hover:shadow-primary/30" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex flex-wrap gap-3">
                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-sm font-medium text-foreground">
                        Filter by Subject:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {subjects.slice(0, 8).map((subject) => (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
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
                            className={`rounded-full px-4 py-1.5 text-sm transition-colors border ${selectedSubject === subject
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-muted-foreground border-border hover:border-primary/50"
                              }`}
                          >
                            {subject}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8 flex justify-center">
          <div className="bg-muted/50 p-1 rounded-2xl inline-flex">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "jobs"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Briefcase className="h-4 w-4" />
              Job Listings
            </button>
            <button
              onClick={() => setActiveTab("tutors")}
              className={`relative px-6 py-2.5 rounded-xl 
                  text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "tutors"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <User className="h-4 w-4" />
              Find Tutors
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "tutors" ? (
            <motion.div
              key="tutors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-2" // 2 columns for better readability
            >
              {tutors.length === 0 ? (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  <User className="mx-auto h-12 w-12 opacity-20 mb-4" />
                  <p>No tutors found matching your criteria.</p>
                </div>
              ) : (
                tutors.map((tutor, index) => (
                  <motion.div
                    key={tutor._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} transitionSpeed={2000}>
                      <Link
                        to={`/tutor/${tutor._id}`}
                        className="group relative flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 h-full"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
                                {tutor.avatar}
                              </div>
                              {tutor.verified && (
                                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background p-0.5">
                                  <div className="h-full w-full bg-success text-success-foreground rounded-full flex items-center justify-center">
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
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {tutor.name}
                              </h3>
                              <p className="text-sm font-medium text-primary">{tutor.subject}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{tutor.specialization}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full">
                            <Heart className="h-5 w-5" />
                          </Button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-border/50">
                          <div className="text-center p-2 rounded-xl bg-muted/30">
                            <div className="flex items-center justify-center gap-1 text-warning mb-1">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="font-bold text-foreground">{tutor.rating}</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{tutor.reviews} Reviews</div>
                          </div>
                          <div className="text-center p-2 rounded-xl bg-muted/30">
                            <div className="flex items-center justify-center gap-1 text-foreground mb-1">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="font-bold">{tutor.experience}</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Exp</div>
                          </div>
                          <div className="text-center p-2 rounded-xl bg-muted/30">
                            <div className="flex items-center justify-center gap-1 text-foreground mb-1">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="font-bold truncate max-w-[80px]">{tutor.city || "Remote"}</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Loc</div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <div>
                            <span className="text-2xl font-bold text-foreground">₹{tutor.hourlyRate}</span>
                            <span className="text-xs text-muted-foreground"> /hour</span>
                          </div>
                          <Button className="rounded-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">View Profile</Button>
                        </div>
                      </Link>
                    </Tilt>
                  </motion.div>
                )))
              }
            </motion.div>
          ) : (
            <motion.div
              key="jobs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-2" // Grid for jobs too
            >
              {jobs.length === 0 ? (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  <Briefcase className="mx-auto h-12 w-12 opacity-20 mb-4" />
                  <p>No job listings found matching your criteria.</p>
                </div>
              ) : (
                jobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} scale={1.01} transitionSpeed={2000} className="h-full">
                      <div
                        className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 h-full relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700" />

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                                {job.jobType || "Full Time"}
                              </span>
                              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                                {job.title}
                              </h3>
                              <p className="text-sm font-medium text-muted-foreground">
                                {job.institution?.institutionName}
                              </p>
                            </div>
                            {job.institution?.institutionName && (
                              <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center font-bold text-muted-foreground border border-border/50">
                                {job.institution.institutionName.charAt(0)}
                              </div>
                            )}
                          </div>


                          <div className="mt-auto space-y-4">
                            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground pt-4 border-t border-border/50">
                              <span className="flex items-center gap-1.5 bg-muted/30 px-2 py-1 rounded-md">
                                <MapPin className="h-3.5 w-3.5 text-primary" />
                                {job.location}
                              </span>

                              {job.salary && (
                                <span className="flex items-center gap-1.5 bg-muted/30 px-2 py-1 rounded-md">
                                  <IndianRupee className="h-3.5 w-3.5 text-primary" />
                                  {job.salary.toLocaleString()}
                                </span>
                              )}

                              <span className="flex items-center gap-1.5 bg-muted/30 px-2 py-1 rounded-md">
                                <Clock className="h-3.5 w-3.5 text-primary" />
                                {new Date(job.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <Button className="w-full rounded-xl shadow-lg shadow-primary/10 group-hover:shadow-primary/20" asChild>
                              <Link to={`/apply/${job._id}`}>Apply Now</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Tilt>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
