import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useMutation } from "@/hooks/useMutation";
import { getDashboardRoute } from "@/utils/navigation";

interface Props {
  isEdit?: boolean;
}

export default function CompleteTutorProfile({ isEdit = false }: Props) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bio: "",
    experienceYears: "",
    subjects: "",
    classes: "",
    city: "",
    salaryMin: "",
  });

  const [salaryMin, setSalaryMin] = useState<number>(0);

  useEffect(() => {
    if (!isEdit) return;

    const fetchProfile = async () => {
      const res = await apiClient.get("/profile/teacher/me");
      const p = res.data.profile;

      setForm({
        bio: p.bio || "",
        experienceYears: String(p.experienceYears || ""),
        subjects: p.subjects?.join(", ") || "",
        classes: p.classes?.join(", ") || "",
        city: p.city || "",
        salaryMin: String(p.expectedSalary?.min || ""),
      });
    };

    fetchProfile();
  }, [isEdit]);

  const { mutate: saveProfile, isLoading } = useMutation({
    successMsg: isEdit ? "Profile updated" : "Profile completed",
    errorMsg: "Failed to save profile",
    onSuccess: () => {
      // Get user role from localStorage to determine redirect
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        const user = JSON.parse(rawUser);
        navigate(getDashboardRoute(user.role));
      } else {
        navigate("/feed");
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    saveProfile("POST", "/profile/teacher", {
      bio: form.bio,
      experienceYears: Number(form.experienceYears),
      subjects: form.subjects.split(","),
      classes: form.classes.split(",").map(Number),
      city: form.city,
      expectedSalary: {
        min: salaryMin,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-xl">
        <h1 className="text-2xl font-bold mb-6">
          Complete Your Teacher Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            required
          />

          <Input
            placeholder="Experience (years)"
            type="number"
            value={form.experienceYears}
            onChange={(e) =>
              setForm({ ...form, experienceYears: e.target.value })
            }
            required
          />

          <Input
            placeholder="Subjects (comma separated)"
            value={form.subjects}
            onChange={(e) => setForm({ ...form, subjects: e.target.value })}
            required
          />

          <Input
            placeholder="Classes (comma separated)"
            value={form.classes}
            onChange={(e) => setForm({ ...form, classes: e.target.value })}
            required
          />

          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          />
          <Input
            type="number"
            placeholder="Expected hourly salary (₹)"
            value={salaryMin === 0 ? "" : salaryMin}
            onChange={(e) => setSalaryMin(Number(e.target.value))}
            required
          />

          <Button type="submit" className="w-full">
            {isEdit ? "Update Profile" : "Complete Profile"}
          </Button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
