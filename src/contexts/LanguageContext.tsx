import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ms" | "en";

interface Translations {
  [key: string]: {
    ms: string;
    en: string;
  };
}

export const translations: Translations = {
  // Header
  "nav.home": { ms: "Utama", en: "Home" },
  "nav.about": { ms: "Tentang Kami", en: "About Us" },
  "nav.guidelines": { ms: "Panduan Penduduk", en: "Resident Guidelines" },
  "nav.fees": { ms: "Kutipan Yuran Keselamatan", en: "Security Fee Collection" },
  "nav.announcements": { ms: "Pengumuman", en: "Announcements" },
  "nav.contact": { ms: "Hubungi Kami", en: "Contact Us" },
  "nav.complaint": { ms: "Struktur Aduan", en: "Complaint Structure" },
  "nav.login": { ms: "LOG MASUK", en: "LOGIN" },
  
  // Hero
  "hero.welcome": { ms: "Selamat Datang ke", en: "Welcome to" },
  "hero.association": { ms: "Persatuan Penduduk", en: "Residents' Association" },
  "hero.of": { ms: "of", en: "of" },
  "hero.community": { ms: "The Strata Bandar Puteri Bangi", en: "The Strata Bandar Puteri Bangi" },
  "hero.tagline": { ms: "Bersama kita mencipta komuniti yang lebih selamat, lebih kuat, dan lebih bahagia.", en: "Together, we create a safer, stronger, and happier community." },
  "hero.cta": { ms: "Mari Bermula!", en: "Let's get started!" },
  
  // Announcements
  "announcements.title": { ms: "Pengumuman", en: "Announcement" },
  "announcements.agm": { ms: "Mesyuarat Agung Tahunan", en: "AGM Meeting Scheduled" },
  "announcements.security": { ms: "Bayaran Yuran Keselamatan", en: "Security Fee Payment" },
  "announcements.app": { ms: "JagaApp 2.0 Kini Di Sini", en: "JagaApp 2.0 Now Available" },
  
  // Quick Links
  "quick.resources": { ms: "Sumber Penduduk", en: "Resident Resources" },
  "quick.guide": { ms: "Lihat Panduan Penduduk", en: "View Residents' Guide" },
  "quick.forms": { ms: "Muat Turun Borang", en: "Download Forms" },
  "quick.help": { ms: "Perlukan Bantuan?", en: "Need Help?" },
  
  // Community News
  "news.title": { ms: "Berita & Acara Komuniti", en: "Community News & Events" },
  "news.readMore": { ms: "Baca Lagi", en: "Read More" },
  
  // Footer
  "footer.quickLinks": { ms: "Pautan Pantas", en: "Quick Links" },
  "footer.contact": { ms: "Hubungi Kami", en: "Contact Us" },
  "footer.privacy": { ms: "Dasar Privasi", en: "Privacy Policy" },
  "footer.terms": { ms: "Terma Penggunaan", en: "Terms of Use" },
  "footer.sitemap": { ms: "Peta Laman", en: "Sitemap" },
  "footer.login": { ms: "Log Masuk Penduduk", en: "Resident Login" },
  "footer.copyright": { ms: "Hak Cipta Terpelihara", en: "All rights reserved" },
  
  // Complaint Structure
  "complaint.title": { ms: "Struktur Aduan dan Maklumbalas", en: "Complaint Structure & Feedback" },
  "complaint.subtitle": { ms: "STRUKTUR ADUAN & MAKLUMBALAS", en: "COMPLAINT STRUCTURE & FEEDBACK" },
  "complaint.issues": { ms: "ISU / MASALAH", en: "ISSUES / PROBLEMS" },
  "complaint.action": { ms: "TINDAKAN PENGADU", en: "ACTION COMPLAINANT" },
  "complaint.duration": { ms: "TEMPOH TINDAKAN", en: "DURATION OF ACTION" },
  "complaint.notes": { ms: "NOTA", en: "NOTES" },
  
  "complaint.issue1": { ms: "Gangguan kejiranan berkaitan tingkah laku, aktiviti berbahaya atau pelanggaran undang-undang.", en: "Neighbourhood nuisance on matters related to behaviour, dangerous activities or legal violations." },
  "complaint.action1": { ms: "Lapor terus kepada MPKj/Polis", en: "Direct report to MPKj/Polis" },
  "complaint.duration1": { ms: "Tertakluk kepada agensi berkaitan", en: "Subject to relevant agencies" },
  "complaint.notes1": { ms: "Aduan kepada Persatuan Penduduk hanya diterima sebagai Makluman sahaja.", en: "Complaints to the Resident Association are being accepted as an Alert only." },
  
  "complaint.issue2": { ms: "Kerosakan teknikal unit kediaman. *kerosakan minor & biasa.", en: "Technical malfunction of the residential unit. *minor & common damage." },
  "complaint.action2": { ms: "Lapor kepada pemaju (jika ada waranti) atau MPKj (jika berkenaan)", en: "Report to the developer (if there is a warranty) or MPKj (if applicable)" },
  "complaint.duration2": { ms: "Tertakluk kepada agensi berkaitan", en: "Subject to relevant agencies" },
  "complaint.notes2": { ms: "Aduan kepada Persatuan Penduduk hanya diterima sebagai Makluman sahaja.", en: "Complaints to the Resident Association are being accepted as an Alert only." },
  
  "complaint.issue3": { ms: "Kerosakan atau kemusnahan harta awam seperti lampu jalan, peralatan kawalan keselamatan, jalan rosak, taman permainan.", en: "Disruption or damage to public property such as street lights, safety control equipment, damaged roads, playgrounds." },
  "complaint.action3": { ms: "Lapor kepada Persatuan Penduduk", en: "Report to Resident Association" },
  "complaint.duration3": { ms: "Dalam Tiga (3) Hari Bekerja", en: "In Three (3) Working Days" },
  "complaint.notes3": { ms: "Persatuan Penduduk akan melaporkan kepada agensi berkaitan.", en: "The Resident Association will report to the relevant agencies." },
  
  "complaint.issue4": { ms: "Kerosakan teknikal unit kediaman. *Kerosakan besar, kegagalan reka bentuk menyebabkan kerosakan berulang atau jangka panjang.", en: "Technical malfunction of the residential unit. *Major damage, design failure causing repeated damage or long-term damage." },
  "complaint.action4": { ms: "Pemilik perlu melaporkan kepada pemaju atau agensi berkaitan. Salinan kepada: Persatuan Penduduk", en: "Owners need to report to the developer or agency related. Copy to: Resident Association" },
  "complaint.duration4": { ms: "Dalam Lima (5) Hari Bekerja / Tertakluk kepada agensi berkaitan", en: "In Five (5) Working Days / Subject to relevant agencies" },
  "complaint.notes4": { ms: "Persatuan Penduduk akan membantu dalam sokongan susulan serta rujukan kepada agensi berkaitan (jika perlu)", en: "The Resident Association will assist in follow-up support as well as referrals to relevant agencies (if necessary)" },
  
  // Resident Guidelines Page
  "guide.title": { ms: "Panduan Penduduk", en: "Resident Guidelines" },
  "guide.procedures.title": { ms: "Tatacara dan Panduan Majlis", en: "Council Procedures and Guidelines" },
  "guide.download": { ms: "Muat Turun", en: "Download" },
  "guide.scanQR": { ms: "Imbas Untuk Borang Online", en: "Scan for Online Form" },
  "guide.goToForm": { ms: "Pergi ke Borang Notifikasi", en: "Go to Notification Form" },
  "guide.accessCard.title": { ms: "Permohonan Kad Akses Tambahan", en: "Additional Access Card Application" },
  "guide.accessCard.steps": { ms: "Langkah Permohonan", en: "Application Steps" },
  "guide.accessCard.fees": { ms: "Bayaran & Maklumat Akaun", en: "Fees & Account Info" },
  "guide.downloadForm": { ms: "Muat Turun Borang", en: "Download Form" },
  "guide.contacts.title": { ms: "Info dan Talian Berguna", en: "Useful Info & Contacts" },
  
  // Login
  "login.title": { ms: "Log Masuk Portal Penduduk", en: "Resident Portal Login" },
  "login.email": { ms: "Nama Pengguna atau E-mel", en: "Username or Email" },
  "login.password": { ms: "Kata Laluan", en: "Password" },
  "login.remember": { ms: "Ingat Saya", en: "Remember Me" },
  "login.forgot": { ms: "Lupa Kata Laluan?", en: "Forgot Password?" },
  "login.submit": { ms: "LOG MASUK SELAMAT", en: "SECURE LOGIN" },
  "login.noAccount": { ms: "Belum mempunyai akaun? Hubungi Pejabat Pengurusan.", en: "Don't have an account yet? Contact the Management Office." },
  
  // Dashboard
  "dashboard.title": { ms: "Papan Pemuka Saya", en: "My Dashboard" },
  "dashboard.welcome": { ms: "Selamat Datang", en: "Welcome" },
  "dashboard.profile": { ms: "Tetapan Profil", en: "Profile Settings" },
  "dashboard.logout": { ms: "Log Keluar", en: "Logout" },
  "dashboard.nav.dashboard": { ms: "Papan Pemuka", en: "Dashboard" },
  "dashboard.nav.profile": { ms: "Profil Saya", en: "My Profile" },
  "dashboard.nav.payments": { ms: "Sejarah Pembayaran", en: "Payment History" },
  "dashboard.nav.feedback": { ms: "Hantar Maklumbalas", en: "Submit Feedback" },
  "dashboard.levy": { ms: "Yuran Keselamatan Tertunggak", en: "Outstanding Security Levy" },
  "dashboard.dueDate": { ms: "Tarikh Akhir", en: "Due Date" },
  "dashboard.payNow": { ms: "Bayar Sekarang", en: "Pay Now" },
  "dashboard.status": { ms: "Status Bulan Semasa", en: "Current Month Status" },
  "dashboard.active": { ms: "Aktif", en: "Active" },
  "dashboard.totalPaid": { ms: "Jumlah Dibayar Tahun Ini", en: "Total Paid This Year" },
  "dashboard.recentTrans": { ms: "Transaksi Terkini", en: "Recent Transactions" },
  "dashboard.date": { ms: "Tarikh", en: "Date" },
  "dashboard.description": { ms: "Penerangan", en: "Description" },
  "dashboard.amount": { ms: "Jumlah", en: "Amount" },
  "dashboard.paid": { ms: "Dibayar", en: "Paid" },
  "dashboard.viewHistory": { ms: "Lihat Sejarah Pembayaran Penuh", en: "View Full Payment History" },
  
  // Feedback Form
  "feedback.title": { ms: "Hantar Maklumbalas atau Aduan", en: "Submit Feedback or Complaint" },
  "feedback.intro": { ms: "Sila isi borang di bawah. Kami akan membalas dalam 3 hari bekerja.", en: "Please fill out the form below. We aim to respond within 3 working days." },
  "feedback.type": { ms: "Jenis Maklumbalas", en: "Feedback Type" },
  "feedback.selectOne": { ms: "Pilih Satu", en: "Select One" },
  "feedback.general": { ms: "Cadangan Am", en: "General Suggestion" },
  "feedback.facility": { ms: "Aduan Fasiliti", en: "Facility Complaint" },
  "feedback.security": { ms: "Isu Keselamatan", en: "Security Issue" },
  "feedback.other": { ms: "Lain-lain", en: "Other" },
  "feedback.subject": { ms: "Subjek", en: "Subject" },
  "feedback.details": { ms: "Penerangan / Butiran", en: "Description / Details" },
  "feedback.attachment": { ms: "Lampirkan Foto/Dokumen", en: "Attach Photo/Document" },
  "feedback.chooseFile": { ms: "Pilih Fail", en: "Choose File" },
  "feedback.maxSize": { ms: "Maksimum 5MB, JPG/PDF sahaja.", en: "Max 5MB, JPG/PDF only." },
  "feedback.contactEmail": { ms: "E-mel Hubungan Anda", en: "Your Contact Email" },
  "feedback.captcha": { ms: "Saya bukan robot", en: "I am not a robot" },
  "feedback.submit": { ms: "HANTAR MAKLUMBALAS", en: "SUBMIT FEEDBACK" },
  "feedback.cancel": { ms: "Batal", en: "Cancel" },
  
  // Theme
  "theme.dark": { ms: "Mod Gelap", en: "Dark Mode" },
  "theme.light": { ms: "Mod Terang", en: "Light Mode" },
  
  // Language
  "lang.toggle": { ms: "EN", en: "BM" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ms";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
