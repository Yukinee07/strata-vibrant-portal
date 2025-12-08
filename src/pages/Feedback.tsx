import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const feedbackCategories = [
  { value: "general", label: "General Suggestion" },
  { value: "facility", label: "Facility Complaint" },
  { value: "security", label: "Security Issue" },
  { value: "maintenance", label: "Maintenance Request" },
  { value: "other", label: "Other" },
];

const Feedback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userEmail = "ahmad.resident@email.com"; // Auto-filled from session

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 5MB",
          variant: "destructive",
        });
        return;
      }
      // Validate file type
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Only JPG, PNG, and PDF files are allowed",
          variant: "destructive",
        });
        return;
      }
      setAttachment(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaChecked) {
      toast({
        title: "Verification required",
        description: "Please complete the security check",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Feedback Submitted",
      description: "Thank you! We'll respond within 3 working days.",
    });

    setIsSubmitting(false);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Submit Feedback or Complaint
        </h1>
        <p className="text-muted-foreground mt-2">
          Please fill out the form below. We aim to respond within 3 working
          days.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Feedback Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Feedback Type <span className="text-destructive">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select One" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {feedbackCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject <span className="text-destructive">*</span>
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter a brief subject line"
                required
              />
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label htmlFor="details">
                Description / Details <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Please provide as much detail as possible..."
                rows={6}
                required
              />
            </div>

            {/* Attachment */}
            <div className="space-y-2">
              <Label>Attach Photo/Document (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {attachment ? (
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-sm text-foreground">
                      {attachment.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setAttachment(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Max 5MB, JPG/PNG/PDF only
                      </span>
                    </div>
                  </label>
                )}
              </div>
            </div>

            {/* Contact Email (Auto-filled) */}
            <div className="space-y-2">
              <Label htmlFor="email">Your Contact Email</Label>
              <Input
                id="email"
                value={userEmail}
                disabled
                className="bg-muted text-muted-foreground"
              />
            </div>

            {/* CAPTCHA */}
            <div className="border border-border rounded-lg p-4 bg-secondary">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="captcha"
                  checked={captchaChecked}
                  onCheckedChange={(checked) =>
                    setCaptchaChecked(checked as boolean)
                  }
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="captcha" className="cursor-pointer">
                  I am not a robot
                </Label>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                reCAPTCHA verification
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Submitting..." : "SUBMIT FEEDBACK"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
