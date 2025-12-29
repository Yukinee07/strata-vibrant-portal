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
import { useLanguage } from "@/contexts/LanguageContext";

const Feedback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userEmail = "ahmad.resident@email.com";

  const feedbackCategories = [
    { value: "general", label: t("feedback.general") },
    { value: "facility", label: t("feedback.facility") },
    { value: "security", label: t("feedback.security") },
    { value: "other", label: t("feedback.other") },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: language === "ms" ? "Fail terlalu besar" : "File too large",
          description: language === "ms" ? "Saiz maksimum ialah 5MB" : "Maximum file size is 5MB",
          variant: "destructive",
        });
        return;
      }
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        toast({
          title: language === "ms" ? "Jenis fail tidak sah" : "Invalid file type",
          description: language === "ms" ? "Hanya fail JPG, PNG, dan PDF dibenarkan" : "Only JPG, PNG, and PDF files are allowed",
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
        title: language === "ms" ? "Pengesahan diperlukan" : "Verification required",
        description: language === "ms" ? "Sila lengkapkan semakan keselamatan" : "Please complete the security check",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: language === "ms" ? "Maklumbalas Dihantar" : "Feedback Submitted",
      description: language === "ms" ? "Terima kasih! Kami akan membalas dalam 3 hari bekerja." : "Thank you! We'll respond within 3 working days.",
    });

    setIsSubmitting(false);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {t("feedback.title")}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t("feedback.intro")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {language === "ms" ? "Borang Maklumbalas" : "Feedback Form"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                {t("feedback.type")} <span className="text-destructive">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder={t("feedback.selectOne")} />
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
                {t("feedback.subject")} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={language === "ms" ? "Masukkan subjek ringkas" : "Enter a brief subject line"}
                required
              />
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label htmlFor="details">
                {t("feedback.details")} <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={language === "ms" ? "Sila berikan butiran sepenuhnya..." : "Please provide as much detail as possible..."}
                rows={6}
                required
              />
            </div>

            {/* Attachment */}
            <div className="space-y-2">
              <Label>{t("feedback.attachment")}</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {attachment ? (
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-sm text-foreground">{attachment.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setAttachment(null)}>
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
                        {language === "ms" ? "Klik untuk memuat naik" : "Click to upload"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t("feedback.maxSize")}
                      </span>
                    </div>
                  </label>
                )}
              </div>
            </div>

            {/* Contact Email (Auto-filled) */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("feedback.contactEmail")}</Label>
              <Input id="email" value={userEmail} disabled className="bg-muted text-muted-foreground" />
            </div>

            {/* CAPTCHA */}
            <div className="border border-border rounded-lg p-4 bg-secondary">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="captcha"
                  checked={captchaChecked}
                  onCheckedChange={(checked) => setCaptchaChecked(checked as boolean)}
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="captcha" className="cursor-pointer">
                  {t("feedback.captcha")}
                </Label>
              </div>
              <p className="text-xs text-muted-foreground mt-2">reCAPTCHA</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                {isSubmitting 
                  ? (language === "ms" ? "Menghantar..." : "Submitting...") 
                  : t("feedback.submit")}
              </Button>
              <Button type="button" variant="ghost" onClick={() => navigate("/dashboard")}>
                {t("feedback.cancel")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
