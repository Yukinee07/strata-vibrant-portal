import { useState } from "react";
import { Edit, Save, X, Upload, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDeveloper } from "@/contexts/DeveloperContext";
import { toast } from "sonner";

interface MeetingLocationEditorProps {
  currentLocation: {
    title: string;
    description: string;
    mapUrl: string;
    imageUrl: string;
  };
  onLocationChange: (location: {
    title: string;
    description: string;
    mapUrl: string;
    imageUrl: string;
  }) => void;
}

const MeetingLocationEditor = ({ currentLocation, onLocationChange }: MeetingLocationEditorProps) => {
  const { language } = useLanguage();
  const { isDeveloper } = useDeveloper();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmUpdate, setConfirmUpdate] = useState(false);

  // Form state
  const [title, setTitle] = useState(currentLocation.title);
  const [description, setDescription] = useState(currentLocation.description);
  const [mapUrl, setMapUrl] = useState(currentLocation.mapUrl);
  const [imageUrl, setImageUrl] = useState(currentLocation.imageUrl);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Reset to current values when opening
      setTitle(currentLocation.title);
      setDescription(currentLocation.description);
      setMapUrl(currentLocation.mapUrl);
      setImageUrl(currentLocation.imageUrl);
    }
    setIsOpen(open);
  };

  const handleUpdate = () => {
    onLocationChange({
      title,
      description,
      mapUrl,
      imageUrl,
    });
    toast.success(language === "ms" ? "Lokasi dikemaskini!" : "Location updated!");
    setIsOpen(false);
    setConfirmUpdate(false);
  };

  if (!isDeveloper) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <Edit className="w-4 h-4" />
            {language === "ms" ? "Sunting Lokasi" : "Edit Location"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {language === "ms" ? "Sunting Lokasi Mesyuarat" : "Edit Meeting Location"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="location-title">
                {language === "ms" ? "Tajuk Lokasi" : "Location Title"}
              </Label>
              <Input
                id="location-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={language === "ms" ? "Contoh: Lokasi AGM" : "E.g., AGM Location"}
              />
            </div>

            <div>
              <Label htmlFor="location-description">
                {language === "ms" ? "Keterangan Lokasi" : "Location Description"}
              </Label>
              <Textarea
                id="location-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={language === "ms" 
                  ? "Alamat penuh dan butiran lokasi" 
                  : "Full address and location details"}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="map-url">
                {language === "ms" ? "Pautan Google Maps" : "Google Maps Link"}
              </Label>
              <Input
                id="map-url"
                value={mapUrl}
                onChange={(e) => setMapUrl(e.target.value)}
                placeholder="https://maps.google.com/..."
              />
            </div>

            <div>
              <Label htmlFor="image-url">
                {language === "ms" ? "URL Imej Peta" : "Map Image URL"}
              </Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder={language === "ms" 
                  ? "URL imej peta atau tangkapan skrin" 
                  : "URL to map image or screenshot"}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {language === "ms" 
                  ? "Biarkan kosong untuk menggunakan imej sedia ada" 
                  : "Leave empty to keep existing image"}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setConfirmUpdate(true)}
                className="flex-1 gap-2"
                disabled={!title || !description}
              >
                <Save className="w-4 h-4" />
                {language === "ms" ? "Simpan Perubahan" : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                {language === "ms" ? "Batal" : "Cancel"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmUpdate}
        onOpenChange={setConfirmUpdate}
        title={language === "ms" ? "Sahkan Kemaskini" : "Confirm Update"}
        description={language === "ms" 
          ? "Adakah anda pasti mahu mengemaskini lokasi mesyuarat ini?" 
          : "Are you sure you want to update the meeting location?"}
        onConfirm={handleUpdate}
      />
    </>
  );
};

export default MeetingLocationEditor;