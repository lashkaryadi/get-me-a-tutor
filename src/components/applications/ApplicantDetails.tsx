import { Mail, Phone, Briefcase, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApplicantDetailsProps {
  app: {
    tutor: {
      email: string;
      phone: string;
    };
    experience: string;
    expectedSalary: string;
    message: string;
    resumeUrl: string;
  };
}

export default function ApplicantDetails({ app }: ApplicantDetailsProps) {
  return (
    <div className="px-4 pb-6 pt-2 border-t border-border">
      <div className="grid md:grid-cols-3 gap-6 mt-4">
        {/* Candidate Info */}
        <div className="space-y-4 text-sm">
          <h4 className="font-semibold text-muted-foreground uppercase text-xs">
            Candidate Details
          </h4>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href={`mailto:${app.tutor?.email}`}
                className="hover:underline"
              >
                {app.tutor?.email}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a
                href={`tel:${app.tutor?.phone}`}
                className="hover:underline"
              >
                {app.tutor?.phone}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              {app.experience} experience
            </div>

            <div>
              <span className="font-medium">₹</span> Expected:{" "}
              {app.expectedSalary}
            </div>
          </div>

          {app.resumeUrl && (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => window.open(app.resumeUrl, "_blank")}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          )}
        </div>

        {/* Cover Letter */}
        <div className="md:col-span-2">
          <h4 className="font-semibold text-muted-foreground uppercase text-xs mb-2">
            Cover Letter
          </h4>
          <div className="bg-muted/30 p-4 rounded-lg text-sm whitespace-pre-wrap">
            {app.message || "No cover letter provided."}
          </div>
        </div>
      </div>
    </div>
  );
}