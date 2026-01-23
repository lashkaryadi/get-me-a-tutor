import { Button } from "@/components/ui/button";
import { Check, Clock, X } from "lucide-react";

interface ApplicantActionsProps {
  onReject: () => void;
  onShortlist: () => void;
  onSelect: () => void;
  disabled: boolean;
  appliedDate: string;
}

export default function ApplicantActions({
  onReject,
  onShortlist,
  onSelect,
  disabled,
  appliedDate,
}: ApplicantActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-4 border-t border-border border-dashed">
      <span className="text-sm text-muted-foreground mr-auto">
        Applied on{" "}
        {new Date(appliedDate).toLocaleDateString()}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={onReject}
        disabled={disabled}
      >
        <X className="mr-2 h-4 w-4 text-red-500" /> Reject
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onShortlist}
        disabled={disabled}
      >
        <Clock className="mr-2 h-4 w-4 text-blue-500" />{" "}
        Shortlist
      </Button>

      <Button
        size="sm"
        onClick={onSelect}
        disabled={disabled}
      >
        <Check className="mr-2 h-4 w-4" /> Select Candidate
      </Button>
    </div>
  );
}