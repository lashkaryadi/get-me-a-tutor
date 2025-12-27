import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApi } from "@/hooks/useApi";
import { useMutation } from "@/hooks/useMutation";
import apiClient  from "@/api/apiClient";
import {
  ArrowLeft,
  MapPin,
  Clock,
  IndianRupee,
  Building2,
  Upload,
  CheckCircle,
  FileText,
  User,
  Phone,
  Mail,
} from "lucide-react";


interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  type: string;
  requirements: string[];
}

interface ApplicationData {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  currentLocation: string;
  expectedSalary: string;
  resume: File | null;
  coverLetter: string;
}

export default function ApplyJob() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  // Job details fetch करो
  const { data: job, loading: jobLoading } = useApi<Job>(`/jobs/${jobId}`);

  // Application submit करो
  const { mutate: submitApplication, isLoading } = useMutation({
    successMsg: "Application submitted successfully! ✅",
    errorMsg: "Failed to submit application ❌",
    onSuccess: () => {
      setTimeout(() => {
        navigate("/my-applications");
      }, 1500);
    },
  });

  const [formData, setFormData] = useState<ApplicationData>({
    jobId: jobId || "",
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    currentLocation: "",
    expectedSalary: "",
    resume: null,
    coverLetter: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitApplication("POST", "/applications/apply", formData);
  }; 

  const handleApplyJob = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', formData.jobId);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('currentLocation', formData.currentLocation);
      formDataToSend.append('expectedSalary', formData.expectedSalary);
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await apiClient.post('/applications/apply', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response?.status === 200 || response?.status === 201) {
        // Handle success
        console.log('Application submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  if (jobLoading) return <div>Loading job details...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/feed"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Link>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Job Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl gradient-primary">
                  <Building2 className="h-7 w-7 text-primary-foreground" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-foreground">{job.title}</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IndianRupee className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {job.type}
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <h3 className="mb-3 font-semibold text-foreground">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <h1 className="mb-2 text-2xl font-bold text-foreground">Apply for this Position</h1>
                <p className="mb-8 text-muted-foreground">Fill in your details to submit your application</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="fullName"
                          className="pl-12"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-12"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          className="pl-12"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Input
                        id="experience"
                        placeholder="e.g., 3 years"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="currentLocation">Current Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="currentLocation"
                          className="pl-12"
                          placeholder="Your city"
                          value={formData.currentLocation}
                          onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedSalary">Expected Salary (₹/month)</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="expectedSalary"
                          type="number"
                          className="pl-12"
                          placeholder="e.g., 30000"
                          value={formData.expectedSalary}
                          onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Tell us why you're a great fit for this position..."
                      rows={5}
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Resume *</Label>
                    <div className="rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary/50">
                      <input
                        type="file"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="resume" className="cursor-pointer">
                        {formData.resume ? (
                          <div className="flex items-center justify-center gap-3">
                            <FileText className="h-8 w-8 text-primary" />
                            <div className="text-left">
                              <p className="font-medium text-foreground">{formData.resume.name}</p>
                              <p className="text-sm text-muted-foreground">Click to change file</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                            <p className="font-medium text-foreground">Drop your resume here or click to upload</p>
                            <p className="mt-1 text-sm text-muted-foreground">PDF, DOC, DOCX up to 5MB</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" onClick={handleApplyJob}>
                    <CheckCircle className="h-5 w-5" />
                    Submit Application
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
