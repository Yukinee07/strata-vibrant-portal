import { useState } from "react";
import { User, Mail, Phone, Home, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Profile = () => {
  const { language } = useLanguage();
  const { user, profile, updateProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "Ahmad bin Abdullah",
    phone: profile?.phone || "+60 12-345 6789",
    unit_number: profile?.unit_number || "A-12-03",
  });

  const handleSave = async () => {
    const { error } = await updateProfile(formData);
    if (error) {
      toast.error(language === "ms" ? "Gagal kemaskini profil" : "Failed to update profile");
    } else {
      toast.success(language === "ms" ? "Profil berjaya dikemaskini" : "Profile updated successfully");
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {language === "ms" ? "Profil Saya" : "My Profile"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === "ms" 
            ? "Urus maklumat peribadi anda" 
            : "Manage your personal information"}
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {formData.full_name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
          </div>
          <CardTitle className="text-xl">{formData.full_name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {language === "ms" ? "Penduduk Aktif" : "Active Resident"}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              {language === "ms" ? "Nama Penuh" : "Full Name"}
            </Label>
            {isEditing ? (
              <Input
                id="fullName"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            ) : (
              <p className="text-foreground py-2">{formData.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {language === "ms" ? "E-mel" : "Email"}
            </Label>
            <p className="text-foreground py-2">{user?.email || "ahmad.resident@email.com"}</p>
            <p className="text-xs text-muted-foreground">
              {language === "ms" ? "E-mel tidak boleh diubah" : "Email cannot be changed"}
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              {language === "ms" ? "No. Telefon" : "Phone Number"}
            </Label>
            {isEditing ? (
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            ) : (
              <p className="text-foreground py-2">{formData.phone}</p>
            )}
          </div>

          {/* Unit Number */}
          <div className="space-y-2">
            <Label htmlFor="unit" className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              {language === "ms" ? "No. Unit" : "Unit Number"}
            </Label>
            {isEditing ? (
              <Input
                id="unit"
                value={formData.unit_number}
                onChange={(e) => setFormData({ ...formData, unit_number: e.target.value })}
              />
            ) : (
              <p className="text-foreground py-2">{formData.unit_number}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  {language === "ms" ? "Simpan" : "Save"}
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  {language === "ms" ? "Batal" : "Cancel"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
                {language === "ms" ? "Edit Profil" : "Edit Profile"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Membership Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {language === "ms" ? "Maklumat Keahlian" : "Membership Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {language === "ms" ? "No. Ahli" : "Member ID"}
            </span>
            <span className="font-medium">STR-2024-0123</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {language === "ms" ? "Tarikh Daftar" : "Registration Date"}
            </span>
            <span className="font-medium">15 Jan 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {language === "ms" ? "Status" : "Status"}
            </span>
            <span className="font-medium text-primary">
              {language === "ms" ? "Aktif" : "Active"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
