import { ChevronDown, ChevronUp } from "lucide-react";

interface ApplicantHeaderProps {
  app: {
    _id: string;
    tutor: {
      _id: string;
      name: string;
      email: string;
      phone: string;
    };
    job: {
      title: string;
    };
    experience: string;
    currentLocation: string;
    expectedSalary: string;
    message: string;
    resumeUrl: string;
    status: "pending" | "shortlisted" | "rejected" | "selected";
    createdAt: string;
  };
  expanded: boolean;
  onToggle: () => void;
}

export default function ApplicantHeader({ app, expanded, onToggle }: ApplicantHeaderProps) {
  return (
    <div
      className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
          {app.tutor?.name?.charAt(0) || "U"}
        </div>
        <div>
          <h3 className="font-semibold text-lg">
            {app.tutor?.name || "Unknown Tutor"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Applied for{" "}
            <span className="font-medium text-foreground">
              {app.job?.title}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium border capitalize
          ${
            app.status === "selected"
              ? "bg-green-100 text-green-700 border-green-200"
              : app.status === "rejected"
              ? "bg-red-100 text-red-700 border-red-200"
              : app.status === "shortlisted"
              ? "bg-blue-100 text-blue-700 border-blue-200"
              : "bg-yellow-100 text-yellow-700 border-yellow-200"
          }`}
        >
          {app.status}
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}