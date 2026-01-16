import { useState } from "react";
import { Upload, X, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import qrAduanCadangan from "@/assets/qr-aduan-cadangan.png";

const ContactUs = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  // Feedback form state
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactEmail, setContactEmail] = useState("");

  const feedbackCategories = [
    { value: "general", label: t("feedback.general") },
    { value: "facility", label: t("feedback.facility") },
    { value: "security", label: t("feedback.security") },
    { value: "other", label: t("feedback.other") },
  ];

  const complaints = [
    {
      number: 1,
      issue: t("complaint.issue1"),
      action: t("complaint.action1"),
      duration: t("complaint.duration1"),
      notes: t("complaint.notes1"),
      color: "bg-primary",
    },
    {
      number: 2,
      issue: t("complaint.issue2"),
      action: t("complaint.action2"),
      duration: t("complaint.duration2"),
      notes: t("complaint.notes2"),
      color: "bg-primary/80",
    },
    {
      number: 3,
      issue: t("complaint.issue3"),
      action: t("complaint.action3"),
      duration: t("complaint.duration3"),
      notes: t("complaint.notes3"),
      color: "bg-primary/60",
    },
    {
      number: 4,
      issue: t("complaint.issue4"),
      action: t("complaint.action4"),
      duration: t("complaint.duration4"),
      notes: t("complaint.notes4"),
      color: "bg-accent",
    },
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

    // Reset form
    setCategory("");
    setSubject("");
    setDetails("");
    setAttachment(null);
    setCaptchaChecked(false);
    setContactEmail("");
    setIsSubmitting(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-grow">
          {/* Page Title Section */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4 text-center">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("contact.title")}
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                {t("contact.subtitle")}
              </p>
            </div>
          </section>

          {/* QR Code & Form Section */}
          <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                {/* QR Code Card */}
                <Card className="bg-card shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-primary">
                      {t("contact.formTitle")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <p className="text-muted-foreground mb-6 text-center">
                      {t("contact.scanInstruction")}
                    </p>
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                      <img 
                        src={qrAduanCadangan} 
                        alt="QR Code for Complaint/Suggestion Form" 
                        className="w-64 h-64 md:w-80 md:h-80 object-contain"
                      />
                    </div>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSfc_rtuEJTd0DFIiznl8t66rn7fi3fw7jcx3qScs74mudDQBg/viewform", "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("contact.fillForm")}
                    </Button>
                    <p className="text-sm text-muted-foreground text-center mt-6">
                      {language === "ms" 
                        ? "Persatuan Penduduk The Strata Bandar Puteri Bangi" 
                        : "The Strata Bandar Puteri Bangi Residents' Association"}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Complaint Structure Section */}
          <section className="py-12 bg-secondary">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <div className="w-16 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  {t("complaint.title")}
                </h2>
              </div>

              <div className="bg-gradient-to-br from-primary/90 to-primary rounded-2xl p-8 md:p-12 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-primary-foreground">
                    {t("complaint.subtitle")}
                  </h3>
                  <div className="hidden md:block">
                    <div className="w-20 h-20 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">STRATA</span>
                    </div>
                  </div>
                </div>

                {/* Table Structure */}
                <div className="space-y-4">
                  {complaints.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch"
                    >
                      {/* Issue Column */}
                      <div className={`lg:col-span-3 ${item.color} rounded-lg p-4 relative`}>
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm shadow-lg">
                          {item.number}
                        </div>
                        <div className="pt-4">
                          {index === 0 && (
                            <h4 className="text-primary-foreground font-bold text-sm mb-2 uppercase">
                              {t("complaint.issues")}
                            </h4>
                          )}
                          <p className="text-primary-foreground text-sm">{item.issue}</p>
                        </div>
                      </div>

                      {/* Action Column */}
                      <div className="lg:col-span-3 bg-background rounded-lg p-4">
                        {index === 0 && (
                          <h4 className="text-foreground font-bold text-sm mb-2 uppercase text-center">
                            {t("complaint.action")}
                          </h4>
                        )}
                        <p className="text-muted-foreground text-sm">{item.action}</p>
                      </div>

                      {/* Duration Column */}
                      <div className="lg:col-span-3 bg-background rounded-lg p-4">
                        {index === 0 && (
                          <h4 className="text-foreground font-bold text-sm mb-2 uppercase text-center">
                            {t("complaint.duration")}
                          </h4>
                        )}
                        <p className="text-muted-foreground text-sm">{item.duration}</p>
                      </div>

                      {/* Notes Column */}
                      <div className="lg:col-span-3 bg-background rounded-lg p-4">
                        {index === 0 && (
                          <h4 className="text-foreground font-bold text-sm mb-2 uppercase text-center">
                            {t("complaint.notes")}
                          </h4>
                        )}
                        <p className="text-muted-foreground text-sm">{item.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Text */}
              <p className="text-center text-muted-foreground mt-8 font-medium">
                PERSATUAN PENDUDUK THE STRATA BANDAR PUTERI BANGI
              </p>
            </div>
          </section>

          {/* Feedback Form Section */}
          <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {t("feedback.title")}
                  </h2>
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

                      {/* Contact Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("feedback.contactEmail")}</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={contactEmail} 
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder={language === "ms" ? "Masukkan e-mel anda" : "Enter your email"}
                        />
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
                        <Button 
                          type="button" 
                          variant="ghost" 
                          onClick={() => {
                            setCategory("");
                            setSubject("");
                            setDetails("");
                            setAttachment(null);
                            setCaptchaChecked(false);
                            setContactEmail("");
                          }}
                        >
                          {t("feedback.cancel")}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ContactUs;
