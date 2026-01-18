import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Upload, X } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
  is_new: boolean | null;
  created_at: string;
  updated_at: string;
}

interface AnnouncementManagerProps {
  onAnnouncementsChange: () => void;
}

const AnnouncementManager = ({ onAnnouncementsChange }: AnnouncementManagerProps) => {
  const { language } = useLanguage();
  const { isDeveloper } = useDeveloper();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Confirm dialogs
  const [confirmAdd, setConfirmAdd] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (isDeveloper) {
      fetchAnnouncements();
    }
  }, [isDeveloper]);

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching announcements:", error);
      return;
    }
    setAnnouncements(data || []);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await supabase.storage
      .from("announcements")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("announcements")
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleAddAnnouncement = async () => {
    setUploading(true);
    let imageUrl = null;

    if (file) {
      imageUrl = await uploadImage(file);
    }

    const { error } = await supabase.from("announcements").insert({
      title,
      content,
      image_url: imageUrl,
      is_new: true,
    });

    setUploading(false);

    if (error) {
      toast.error(language === "ms" ? "Gagal menambah pengumuman" : "Failed to add announcement");
      console.error(error);
      return;
    }

    toast.success(language === "ms" ? "Pengumuman ditambah!" : "Announcement added!");
    resetForm();
    setIsAddOpen(false);
    setConfirmAdd(false);
    fetchAnnouncements();
    onAnnouncementsChange();
  };

  const handleEditAnnouncement = async () => {
    if (!editingAnnouncement) return;

    setUploading(true);
    let imageUrl = editingAnnouncement.image_url;

    if (file) {
      imageUrl = await uploadImage(file);
    }

    const { error } = await supabase
      .from("announcements")
      .update({
        title,
        content,
        image_url: imageUrl,
      })
      .eq("id", editingAnnouncement.id);

    setUploading(false);

    if (error) {
      toast.error(language === "ms" ? "Gagal mengemaskini pengumuman" : "Failed to update announcement");
      console.error(error);
      return;
    }

    toast.success(language === "ms" ? "Pengumuman dikemaskini!" : "Announcement updated!");
    resetForm();
    setIsEditOpen(false);
    setConfirmEdit(false);
    setEditingAnnouncement(null);
    fetchAnnouncements();
    onAnnouncementsChange();
  };

  const handleDeleteAnnouncement = async () => {
    if (!deleteId) return;

    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", deleteId);

    if (error) {
      toast.error(language === "ms" ? "Gagal memadam pengumuman" : "Failed to delete announcement");
      console.error(error);
      return;
    }

    toast.success(language === "ms" ? "Pengumuman dipadam!" : "Announcement deleted!");
    setConfirmDelete(false);
    setDeleteId(null);
    fetchAnnouncements();
    onAnnouncementsChange();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setFile(null);
  };

  const openEditDialog = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setTitle(announcement.title);
    setContent(announcement.content || "");
    setIsEditOpen(true);
  };

  const openDeleteConfirm = (id: string) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  if (!isDeveloper) return null;

  return (
    <div className="mb-8">
      {/* Add Announcement Button - Large & Centered */}
      <div className="flex justify-center mb-8">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button 
              size="lg" 
              className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 text-lg font-semibold shadow-lg"
            >
              <Plus className="w-6 h-6" />
              {language === "ms" ? "Tambah Pengumuman" : "Add Announcement"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {language === "ms" ? "Tambah Pengumuman Baru" : "Add New Announcement"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">{language === "ms" ? "Tajuk" : "Title"}</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={language === "ms" ? "Masukkan tajuk" : "Enter title"}
                />
              </div>
              <div>
                <Label htmlFor="content">{language === "ms" ? "Kandungan" : "Content"}</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={language === "ms" ? "Masukkan kandungan" : "Enter content"}
                  rows={4}
                />
              </div>
              <div>
                <Label>{language === "ms" ? "Muat Naik Gambar" : "Upload Image"}</Label>
                <div className="mt-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <Button
                onClick={() => setConfirmAdd(true)}
                className="w-full"
                disabled={!title || uploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {language === "ms" ? "Hantar" : "Submit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Existing Announcements List for Editing */}
      {announcements.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
            {language === "ms" ? "Urus Pengumuman Sedia Ada" : "Manage Existing Announcements"}
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="flex items-center justify-between bg-background rounded-lg p-3 border"
              >
                <span className="text-sm font-medium truncate flex-1 mr-4">
                  {announcement.title}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(announcement)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => openDeleteConfirm(announcement.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === "ms" ? "Sunting Pengumuman" : "Edit Announcement"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="edit-title">{language === "ms" ? "Tajuk" : "Title"}</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-content">{language === "ms" ? "Kandungan" : "Content"}</Label>
              <Textarea
                id="edit-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <Label>{language === "ms" ? "Ganti Gambar" : "Replace Image"}</Label>
              <div className="mt-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <Button
              onClick={() => setConfirmEdit(true)}
              className="w-full"
              disabled={!title || uploading}
            >
              {language === "ms" ? "Kemaskini" : "Update"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={confirmAdd}
        onOpenChange={setConfirmAdd}
        title={language === "ms" ? "Sahkan Penambahan" : "Confirm Addition"}
        description={language === "ms" 
          ? "Adakah anda pasti mahu menambah pengumuman ini?" 
          : "Are you sure you want to add this announcement?"}
        onConfirm={handleAddAnnouncement}
      />

      <ConfirmDialog
        open={confirmEdit}
        onOpenChange={setConfirmEdit}
        title={language === "ms" ? "Sahkan Kemaskini" : "Confirm Update"}
        description={language === "ms" 
          ? "Adakah anda pasti mahu mengemaskini pengumuman ini?" 
          : "Are you sure you want to update this announcement?"}
        onConfirm={handleEditAnnouncement}
      />

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={language === "ms" ? "Sahkan Pemadaman" : "Confirm Deletion"}
        description={language === "ms" 
          ? "Adakah anda pasti mahu memadam pengumuman ini? Tindakan ini tidak boleh dibatalkan." 
          : "Are you sure you want to delete this announcement? This action cannot be undone."}
        onConfirm={handleDeleteAnnouncement}
        variant="destructive"
      />
    </div>
  );
};

export default AnnouncementManager;
