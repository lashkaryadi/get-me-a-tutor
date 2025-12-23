import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  MapPin,
  IndianRupee,
  Clock,
  Users,
  CheckCircle,
  Building2,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
const experienceLevels = ["Fresher", "1-3 years", "3-5 years", "5+ years"];
const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "Computer Science", "Economics", "Other"];

export default function PostJob() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    // Step 1 - Basic Info
    title: "",
    subject: "",
    description: "",
    // Step 2 - Requirements
    experience: "",
    qualifications: "",
    skills: "",
    // Step 3 - Location & Salary
    location: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    // Step 4 - Additional
    positions: "1",
    deadline: "",
    urgent: false,
  });

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => (prev + 1) as Step);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as Step);
  };

  const handleSubmit = () => {
    console.log("Job posted:", formData);
    // Would redirect to success page
  };

  const updateForm = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    { num: 1, title: "Basic Info" },
    { num: 2, title: "Requirements" },
    { num: 3, title: "Compensation" },
    { num: 4, title: "Review" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/institute/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Post a New Job</h1>
            <p className="text-muted-foreground">Find the perfect tutor for your institution</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                        currentStep >= step.num
                          ? "gradient-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.num ? <CheckCircle className="h-5 w-5" /> : step.num}
                    </div>
                    <span className="mt-2 text-xs text-muted-foreground">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`mx-4 h-0.5 w-16 ${currentStep > step.num ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <Briefcase className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Mathematics Tutor for Class 10-12"
                      value={formData.title}
                      onChange={(e) => updateForm("title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Subject *</Label>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => updateForm("subject", subject)}
                          className={`rounded-full px-4 py-2 text-sm transition-colors ${
                            formData.subject === subject
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the role, responsibilities, and what you're looking for..."
                      rows={5}
                      value={formData.description}
                      onChange={(e) => updateForm("description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Requirements */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <Users className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Requirements</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Experience Level *</Label>
                    <div className="flex flex-wrap gap-2">
                      {experienceLevels.map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => updateForm("experience", level)}
                          className={`rounded-full px-4 py-2 text-sm transition-colors ${
                            formData.experience === level
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualifications">Qualifications Required *</Label>
                    <Textarea
                      id="qualifications"
                      placeholder="e.g., B.Ed, M.Sc in Mathematics, etc."
                      rows={3}
                      value={formData.qualifications}
                      onChange={(e) => updateForm("qualifications", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Key Skills</Label>
                    <Input
                      id="skills"
                      placeholder="e.g., Board exam preparation, Competitive exam coaching"
                      value={formData.skills}
                      onChange={(e) => updateForm("skills", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Compensation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <IndianRupee className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Location & Compensation</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="location"
                        className="pl-12"
                        placeholder="e.g., Mumbai, Maharashtra"
                        value={formData.location}
                        onChange={(e) => updateForm("location", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Job Type *</Label>
                    <div className="flex flex-wrap gap-2">
                      {jobTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateForm("jobType", type)}
                          className={`rounded-full px-4 py-2 text-sm transition-colors ${
                            formData.jobType === type
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="salaryMin">Minimum Salary (₹/month)</Label>
                      <Input
                        id="salaryMin"
                        type="number"
                        placeholder="e.g., 25000"
                        value={formData.salaryMin}
                        onChange={(e) => updateForm("salaryMin", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salaryMax">Maximum Salary (₹/month)</Label>
                      <Input
                        id="salaryMax"
                        type="number"
                        placeholder="e.g., 40000"
                        value={formData.salaryMax}
                        onChange={(e) => updateForm("salaryMax", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="positions">Number of Positions</Label>
                      <Input
                        id="positions"
                        type="number"
                        min="1"
                        value={formData.positions}
                        onChange={(e) => updateForm("positions", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => updateForm("deadline", e.target.value)}
                      />
                    </div>
                  </div>

                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.urgent}
                      onChange={(e) => updateForm("urgent", e.target.checked)}
                      className="h-5 w-5 rounded border-border text-primary"
                    />
                    <span className="text-sm text-foreground">Mark as urgent (highlighted in listings)</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <CheckCircle className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Review & Submit</h2>
                </div>

                <div className="rounded-xl border border-border bg-muted/50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">{formData.title || "Job Title"}</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium text-foreground">Subject: </span>
                        <span className="text-muted-foreground">{formData.subject || "Not specified"}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium text-foreground">Location: </span>
                        <span className="text-muted-foreground">{formData.location || "Not specified"}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium text-foreground">Type: </span>
                        <span className="text-muted-foreground">{formData.jobType || "Not specified"}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <IndianRupee className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium text-foreground">Salary: </span>
                        <span className="text-muted-foreground">
                          {formData.salaryMin && formData.salaryMax
                            ? `₹${formData.salaryMin} - ₹${formData.salaryMax}/month`
                            : "Not specified"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium text-foreground">Experience: </span>
                        <span className="text-muted-foreground">{formData.experience || "Not specified"}</span>
                      </div>
                    </div>
                  </div>

                  {formData.description && (
                    <div className="mt-4 border-t border-border pt-4">
                      <span className="font-medium text-foreground">Description:</span>
                      <p className="mt-2 text-muted-foreground">{formData.description}</p>
                    </div>
                  )}

                  {formData.urgent && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-sm text-destructive">
                      <Clock className="h-4 w-4" />
                      Urgent Hiring
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <CheckCircle className="h-4 w-4" />
                  Post Job
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
