import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { useCredit } from "@/context/CreditContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  Calendar,
  BookOpen,
  Trophy,
  Clock,
  BarChart3,
  MessageCircle,
  IndianRupee,
  GraduationCap,
  Search,
  Plus,
  X,
  MapPin,
  User,
} from "lucide-react";
import apiClient from "@/api/apiClient";
import { useToast } from "@/components/ui/use-toast";

interface Student {
  _id: string;
  name: string;
  grade: string; // mapped from className
  school: string; // mapped from board for now or just generic
  className: string;
  board: string;
  city: string;
  gender: string;
  subjects?: { name: string; progress: number; tutor: string }[];
  upcomingClasses?: number;
  completedClasses?: number;
}

interface Job {
  _id: string;
  title: string;
  status: string;
}

export default function ParentDashboard() {
  const { user } = useAuth();
  const { credits } = useCredit(); // Live credits from context
  const { toast } = useToast();

  // Fetch Children
  const {
    data: studentsData,
    loading: studentsLoading,
    refetch: refetchStudents
  } = useApi<{ students: Student[] }>("/profile/students");
  const children = studentsData?.students || [];

  // Fetch My Jobs (to count active jobs)
  const {
    data: jobsData,
    loading: jobsLoading
  } = useApi<{ jobs: Job[] }>("/jobs/my");
  const activeJobsCount = jobsData?.jobs?.filter(j => j.status === 'active').length || 0;

  // Add Child State
  const [showAddChild, setShowAddChild] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newChild, setNewChild] = useState({
    name: "",
    className: "",
    board: "",
    city: "",
    gender: "male"
  });

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiClient.post("/profile/student", newChild);
      toast({
        title: "Success ✅",
        description: "Child profile added successfully!",
      });
      setShowAddChild(false);
      setNewChild({ name: "", className: "", board: "", city: "", gender: "Male" });
      refetchStudents();
    } catch (error: any) {
      toast({
        title: "Error ❌",
        description: error.response?.data?.message || "Failed to add child",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-2 text-sm font-medium text-primary-foreground">
              <Users className="h-4 w-4" />
              Parent Dashboard
            </div>
            <h1 className="mb-4 text-3xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
              Welcome, {user?.name || "Parent"}
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              Manage your children's learning journey and connect with the best tutors
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                variant="hero-outline"
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/feed">
                  Find Tutors
                  <Search className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/buy-credits">
                  Buy Credits
                  <IndianRupee className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-card py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: children.length.toString(), label: "Children", icon: Users },
              { value: credits.toString(), label: "Credits Available", icon: IndianRupee },
              { value: activeJobsCount.toString(), label: "Active Jobs", icon: Briefcase }, // Replaced generic Active Tutors
              { value: "0", label: "Classes This Month", icon: BookOpen }, // Placeholder until bookings API exists
            ].map((stat, index) => (
              <div key={index} className="text-center">
                {stat.icon && <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />}
                <div className="text-3xl font-bold text-foreground md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Children Profiles */}
            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Children's Profiles
                </h2>
                <Button onClick={() => setShowAddChild(!showAddChild)} size="sm">
                  {showAddChild ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  {showAddChild ? "Cancel" : "Add Child"}
                </Button>
              </div>

              {/* Add Child Form */}
              {showAddChild && (
                <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-6 animate-in fade-in slide-in-from-top-4">
                  <h3 className="mb-4 text-lg font-semibold">Add New Child Profile</h3>
                  <form onSubmit={handleAddChild} className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Child's Name *</Label>
                      <Input
                        id="name"
                        required
                        value={newChild.name}
                        onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="className">Class/Grade *</Label>
                      <Input
                        id="className"
                        required
                        value={newChild.className}
                        onChange={(e) => setNewChild({ ...newChild, className: e.target.value })}
                        placeholder="e.g. Class 10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="board">Board *</Label>
                      <Input
                        id="board"
                        required
                        value={newChild.board}
                        onChange={(e) => setNewChild({ ...newChild, board: e.target.value })}
                        placeholder="e.g. CBSE, ICSE"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={newChild.city}
                        onChange={(e) => setNewChild({ ...newChild, city: e.target.value })}
                        placeholder="e.g. Mumbai"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Gender</Label>
                      <div className="flex gap-4">
                        {['male', 'female', 'other'].map((g) => (
                          <label key={g} className="flex items-center gap-2 cursor-pointer capitalize">
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={newChild.gender === g}

                              onChange={(e) => setNewChild({ ...newChild, gender: e.target.value })}
                              className="text-primary"
                            />
                            {g}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                        {isSubmitting ? "Adding..." : "Save Child Profile"}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-6">
                {studentsLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading profiles...</div>
                ) : children.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-muted-foreground/30 rounded-xl">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No children added yet</h3>
                    <p className="text-muted-foreground mb-4">Add your children to start finding tutors for them.</p>
                    <Button onClick={() => setShowAddChild(true)}>Add Child</Button>
                  </div>
                ) : (
                  children.map((child) => (
                    <div
                      key={child._id}
                      className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                            {child.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-foreground">{child.name}</h3>
                              <p className="text-muted-foreground mb-2">
                                {child.className} • {child.board}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <MapPin className="h-3 w-3" />
                                {child.city}
                              </div>
                            </div>
                            {child.gender && (
                              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                {child.gender}
                              </span>
                            )}
                          </div>

                          {/* Placeholder stats until real progress data is integrated */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <div className="text-xl font-bold text-primary">0</div>
                              <div className="text-xs text-muted-foreground">Classes Booked</div>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <div className="text-xl font-bold text-success">0 hrs</div>
                              <div className="text-xs text-muted-foreground">Learning Time</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  Quick Actions
                </h2>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/post-job">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Post a Job
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/feed">
                        <Search className="h-4 w-4 mr-2" />
                        Find Tutors
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/olympiad">
                        <Trophy className="h-4 w-4 mr-2" />
                        Register for Olympiad
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Credits */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
                  <IndianRupee className="h-6 w-6 text-primary" />
                  Credits
                </h2>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-primary">{credits}</span>
                    <IndianRupee className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use credits to book tutors and post jobs
                  </p>
                  <Button className="w-full" asChild>
                    <Link to="/buy-credits">Buy More Credits</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Briefcase(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

