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
  Mail,
} from "lucide-react";
import { useApi } from "@/hooks/useApi";

export default function TutorProfile() {
  const { id } = useParams();

  const { data, loading, error } = useApi<{
    success: boolean;
    profile: any;
  }>(`/profile/teacher/profile/${id}`);

  if (loading) return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
      <Footer />
    </div>
  );

  if (error || !data?.profile) return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
        <p className="text-muted-foreground mb-6">The tutor profile you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link to="/feed">Browse Tutors</Link>
        </Button>
      </div>
      <Footer />
    </div>
  );

  const profile = data.profile;
  const user = profile.userId;

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
                  {(user?.name || "T")
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                {profile.isVerified && (
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground border-2 border-background">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
                    {user?.name || "Tutor"}
                  </h1>
                  {profile.isVerified && (
                    <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                      Verified
                    </span>
                  )}
                </div>
                <p className="mb-3 text-lg text-primary font-medium capitalize">
                  {profile.subjects?.join(", ") || "Various Subjects"}
                </p>
                <p className="mb-4 text-muted-foreground max-w-2xl">{profile.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  {/* Rating placeholder - hidden until implemented */}
                  {/* <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-medium text-foreground">5.0</span>
                    <span>(0 reviews)</span>
                  </div> */}

                  {profile.city && (
                    <div className="flex items-center gap-1 text-muted-foreground capitalize">
                      <MapPin className="h-4 w-4" />
                      {profile.city}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {profile.experienceYears} years exp.
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col min-w-[200px]">
              <Button size="lg" className="w-full" asChild>
                <a href={`mailto:${user?.email}?subject=Inquiry from Get Me A Tutor`}>
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Tutor
                </a>
              </Button>
              {/* Future Feature: Messaging */}
              {/* <Button variant="outline" size="lg">
                <MessageCircle className="h-5 w-5 mr-2" />
                Message
              </Button> */}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                About Me
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {profile.bio || "No bio available."}
              </p>
            </div>

            {/* Subjects */}
            {profile.subjects && profile.subjects.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Subjects I Teach
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.subjects.map((subject: string) => (
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              {profile.expectedSalary && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Expected Rate</div>
                    <div className="flex items-center justify-center text-3xl font-bold text-foreground">
                      <IndianRupee className="h-6 w-6" />
                      {profile.expectedSalary.min}
                      {profile.expectedSalary.max && ` - ${profile.expectedSalary.max}`}
                      <span className="text-base font-normal text-muted-foreground ml-1">
                        /hour
                      </span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg" asChild>
                    <a href={`mailto:${user?.email}?subject=Booking Inquiry`}>
                      Book Now
                    </a>
                  </Button>
                </div>
              )}

              {/* Languages */}
              {profile.languages && profile.languages.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-semibold text-foreground">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((lang: string) => (
                      <span
                        key={lang}
                        className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground capitalize"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              {profile.availability && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-semibold text-foreground">
                    Availability
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {profile.availability}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

