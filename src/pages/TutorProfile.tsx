import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Star,
  MapPin,
  Clock,
  BookOpen,
  Award,
  Calendar,
  MessageCircle,
  Heart,
  Share2,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Users,
  Video,
  IndianRupee,
} from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useMutation } from "@/hooks/useMutation";

interface TutorProfile {
  _id: string;
  name: string;
  email: string;
  qualifications: string[];
  experience: number;
}

const reviews = [
  { id: 1, name: "Amit Sharma", rating: 5, date: "2 weeks ago", comment: "Excellent teaching methodology! My son's grades improved significantly." },
  { id: 2, name: "Sneha Gupta", rating: 5, date: "1 month ago", comment: "Very patient and explains concepts clearly. Highly recommended!" },
  { id: 3, name: "Rajesh Kumar", rating: 4, date: "1 month ago", comment: "Good tutor, helped me prepare for my board exams effectively." },
];

export default function TutorProfile() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId") || "";
  const { data: profile, loading, error } = useApi<TutorProfile>(
    `/profile/tutor/${userId}`
  );

  const { mutate: updateProfile, isLoading } = useMutation({
    successMsg: "Profile updated successfully! ✅",
    errorMsg: "Failed to update profile ❌",
  });

  const [formData, setFormData] = useState<TutorProfile>({
    _id: profile?._id || "",
    name: profile?.name || "",
    email: profile?.email || "",
    qualifications: profile?.qualifications || [],
    experience: profile?.experience || 0,
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile("PUT", `/profile/tutor/${userId}`, formData);
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Avatar */}
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl gradient-primary text-3xl font-bold text-primary-foreground">
                  {profile.name.split(" ").map((n) => n[0]).join("")}
                </div>
                {/* {tutor.verified && (
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                )} */}
              </div>

              {/* Info */}
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{profile.name}</h1>
                  {/* {tutor.verified && (
                    <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                      Verified
                    </span>
                  )} */}
                </div>
                <p className="mb-3 text-lg text-primary">{/* tutor.subject */}Expert</p>
                <p className="mb-4 text-muted-foreground">{/* tutor.specialization */}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-medium text-foreground">{/* tutor.rating */}4.9</span>
                    <span>(234 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {/* tutor.location */}Mumbai, Maharashtra
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {/* tutor.experience */}8 years
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button size="lg">
                <Calendar className="h-5 w-5" />
                Book a Session
              </Button>
              <Button variant="outline" size="lg">
                <MessageCircle className="h-5 w-5" />
                Message
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold text-foreground">About Me</h2>
              <p className="text-muted-foreground leading-relaxed">{/* tutor.bio */}I am a passionate mathematics educator with a Ph.D. in Applied Mathematics from IIT Bombay. My teaching philosophy focuses on building strong fundamentals and developing problem-solving skills. I have helped over 500 students achieve their academic goals, including JEE and NEET preparations.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Users, label: "Students", value: 523 },
                { icon: Video, label: "Sessions", value: 2150 },
                { icon: Clock, label: "Response", value: "< 1 hour" },
                { icon: Star, label: "Rating", value: 4.9 },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h2>
              <ul className="space-y-3">
                {[
                  "Ph.D. Applied Mathematics - IIT Bombay",
                  "M.Sc. Mathematics - Delhi University",
                  "B.Sc. Mathematics - St. Stephen's College",
                ].map((edu, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subjects */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                <BookOpen className="h-5 w-5 text-primary" />
                Subjects I Teach
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Calculus",
                  "Linear Algebra",
                  "Statistics",
                  "Probability",
                  "JEE Mathematics",
                ].map((subject) => (
                  <span key={subject} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                <Star className="h-5 w-5 text-primary" />
                Student Reviews
              </h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                          {review.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{review.name}</div>
                          <div className="text-xs text-muted-foreground">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 text-center">
                  <div className="flex items-center justify-center text-3xl font-bold text-foreground">
                    <IndianRupee className="h-6 w-6" />
                    {/* tutor.hourlyRate */}800
                    <span className="text-base font-normal text-muted-foreground">/hour</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  <Calendar className="h-5 w-5" />
                  Book Now
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Free cancellation up to 24 hours before session
                </p>
              </div>

              {/* Availability */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Availability</h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday", slots: ["10:00 AM", "2:00 PM", "6:00 PM"] },
                    { day: "Tuesday", slots: ["10:00 AM", "4:00 PM"] },
                    { day: "Wednesday", slots: ["2:00 PM", "6:00 PM", "8:00 PM"] },
                    { day: "Thursday", slots: ["10:00 AM", "2:00 PM"] },
                    { day: "Friday", slots: ["4:00 PM", "6:00 PM"] },
                  ].slice(0, 3).map((day) => (
                    <div key={day.day}>
                      <div className="mb-2 text-sm font-medium text-foreground">{day.day}</div>
                      <div className="flex flex-wrap gap-2">
                        {day.slots.map((slot) => (
                          <span key={slot} className="rounded-lg border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  View Full Schedule
                </Button>
              </div>

              {/* Languages */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {["English", "Hindi", "Marathi"].map((lang) => (
                    <span key={lang} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
