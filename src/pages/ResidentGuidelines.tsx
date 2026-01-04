import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink, Phone, Mail, Globe } from "lucide-react";
import qrTatacara from "@/assets/qr-tatacara.png";
import accessCardInfo from "@/assets/access-card-info.png";
import complaintStructureMalay from "@/assets/complaint-structure-malay.png";
import complaintStructureEnglish from "@/assets/complaint-structure-english.png";

const ResidentGuidelines = () => {
  const { t, language } = useLanguage();

  const usefulContacts = [
    {
      category: language === "ms" ? "Majlis Perbandaran Kajang (MPKj)" : "Kajang Municipal Council (MPKj)",
      contacts: [
        {
          name: language === "ms" ? "Jabatan Penguatkuasaan MPKj" : "MPKj Enforcement Department",
          address: "No. 23-G, Jalan Metro Avenue 1, Metro Avenue, 43000 Kajang, Selangor",
          phone: "03-8737 7899 / 03-8737 1789 (samb. 25)",
          hours: language === "ms" ? "Isnin - Jumaat (8.00 pagi - 5.00 petang)" : "Mon - Fri (8.00am - 5.00pm)",
        },
        {
          name: language === "ms" ? "Ahli Majlis ZON 24 - Puan Rawitiah binti Zakaria" : "Council Member ZONE 24 - Puan Rawitiah binti Zakaria",
          address: "42, Jalan Impian Indah 2, Saujana Impian, 43000 Kajang, Selangor",
          phone: "019-3503871",
          email: "rawiyiah@mpkj.gov.my",
        },
      ],
    },
    {
      category: language === "ms" ? "Perkhidmatan Kecemasan" : "Emergency Services",
      contacts: [
        {
          name: "Balai Polis Bangi",
          address: "45, Jalan Seri Putra 1/4, Bandar Seri Putra, 43000 Kajang, Selangor",
          phone: "03-8925 8222",
        },
        {
          name: "IPD Kajang / Balai Polis Trafik Kajang",
          address: "Jalan Cheras, Bandar Kajang, 43000 Kajang, Selangor",
          phone: "03-8911 4222",
          email: "heakjg@gmail.com",
        },
        {
          name: "Klinik Kesihatan Bandar Seri Putra",
          address: "Jalan Seri Putra 1/9, Bandar Seri Putra, 43000 Kajang, Selangor",
          phone: "03-8925 8518",
        },
        {
          name: language === "ms" ? "Talian Kecemasan Malaysia (999)" : "Malaysia Emergency (999)",
          description: language === "ms" ? "Polis, Bomba, Ambulans" : "Police, Fire, Ambulance",
        },
      ],
    },
    {
      category: language === "ms" ? "Utiliti" : "Utilities",
      contacts: [
        { name: "TNB (Elektrik)", phone: "15454", website: "www.tnb.com.my" },
        { name: "Telekom Malaysia", phone: "100", website: "www.tm.com.my" },
        { name: "Air Selangor", phone: "15300", website: "www.airselangor.com" },
        { name: "Indah Water Konsortium", phone: "03-2284 7828", website: "www.iwk.com.my" },
        { name: "KDEB Waste Management", phone: "1-800-88-2824 / 019-274 2824 (WhatsApp)", website: "www.kdebwm.com" },
      ],
    },
    {
      category: language === "ms" ? "Lain-lain Perkhidmatan" : "Other Services",
      contacts: [
        { name: language === "ms" ? "Jabatan Alam Sekitar" : "Department of Environment", phone: "1-800-88-2727", website: "www.doe.gov.my" },
        { name: "Perhilitan", phone: "1-800-88-5151", website: "www.wildlife.gov.my" },
        { name: "My Bee Savior - Mr John Chan", phone: "016-356 9169", website: "mybeesavior.org" },
      ],
    },
    {
      category: language === "ms" ? "Sekolah Terdekat" : "Nearby Schools",
      contacts: [
        { name: "SK Bandar Bukit Mahkota", phone: "03-8912 5457" },
        { name: "SMK Bandar Seri Putra", phone: "03-8926 5675" },
        { name: "SK Bandar Seri Putra", phone: "03-8925 9717" },
        { name: "SRA Bandar Seri Putra", phone: "03-8925 0315" },
      ],
    },
    {
      category: language === "ms" ? "Masjid" : "Mosques",
      contacts: [
        { name: "Masjid At-Taqwa, Bandar Bukit Mahkota", phone: "019-220 9552" },
        { name: "Masjid Bandar Seri Putra", phone: "03-8922 0600", website: "www.masjidbsp.org.my" },
      ],
    },
  ];

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
              {t("guide.title")}
            </h1>
          </div>
        </section>

        {/* Council Procedures Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("guide.procedures.title")}
              </h2>
            </div>
            
            {/* QR Code & Download - Centered */}
            <div className="flex flex-col items-center max-w-3xl mx-auto">
              <Card className="bg-card shadow-lg w-full">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <p className="text-lg font-semibold text-foreground mb-6">
                    {t("guide.scanQR")}
                  </p>
                  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <img 
                      src={qrTatacara} 
                      alt="QR Code for online form" 
                      className="w-64 h-64 md:w-80 md:h-80 object-contain"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => window.open("https://drive.google.com/file/d/1keBfdp0o8zxeTSmWuFs4QDZqhbAAzTIB/view", "_blank")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t("guide.download")}
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSeseUdDDzZeTGtPBuhgZ-0wLh59UUvuYM0BcwyyQvXYPuxvrA/viewform", "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("guide.goToForm")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </section>

        {/* Complaint Structure Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("complaint.title")}
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <img 
                src={language === "ms" ? complaintStructureMalay : complaintStructureEnglish} 
                alt={t("complaint.title")}
                className="w-full rounded-lg shadow-lg"
              />
              <p className="text-center text-sm text-muted-foreground mt-4">
                PERSATUAN PENDUDUK THE STRATA BANDAR PUTERI BANGI
              </p>
            </div>
          </div>
        </section>

        {/* Access Card Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("guide.accessCard.title")}
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Access Card Info Image */}
              <div className="flex justify-center">
                <img 
                  src={accessCardInfo} 
                  alt="Access Card Information" 
                  className="max-w-md w-full rounded-lg shadow-lg"
                />
              </div>

              {/* Access Card Details */}
              <div className="space-y-6">
                <Card className="bg-card shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">
                      {t("guide.accessCard.steps")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="space-y-2">
                      <p className="font-semibold">{language === "ms" ? "1. Pilih pilihan:" : "1. Choose option:"}</p>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
                        <li>
                          <span className="font-medium text-foreground">
                            {language === "ms" ? "Ahli Persatuan: " : "Association Members: "}
                          </span>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-primary"
                            onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSc0PYapunfEUNKD9wLRgooWauctrBSf_sljrjsB69Z_amZ_8A/viewform", "_blank")}
                          >
                            Google Form
                          </Button>
                        </li>
                        <li>
                          <span className="font-medium text-foreground">
                            {language === "ms" ? "Bukan Ahli: " : "Non-Members: "}
                          </span>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-primary"
                            onClick={() => window.open("https://thestrata.com.my/joomla30/images/Download/Kad%20Akses/BORANG%20PERMOHONAN%20KAD%20AKSES%20PPTSBPB%20Rev.3_25022025.pdf", "_blank")}
                          >
                            {t("guide.downloadForm")}
                          </Button>
                        </li>
                      </ul>
                    </div>
                    <p>{language === "ms" ? "2. Isikan maklumat pemohon dengan lengkap." : "2. Fill in applicant details completely."}</p>
                    <p>{language === "ms" ? "3. Dapatkan pengesahan Ketua Lorong (bukan ahli sahaja)." : "3. Get verification from Lane Head (non-members only)."}</p>
                    <p>{language === "ms" ? "4. Hantar borang kepada Ketua Lorong (bukan ahli sahaja)." : "4. Submit form to Lane Head (non-members only)."}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">
                      {t("guide.accessCard.fees")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold">{language === "ms" ? "Kad Akses:" : "Access Card:"}</p>
                        <p className="text-muted-foreground">{language === "ms" ? "Ahli: RM25/kad" : "Member: RM25/card"}</p>
                        <p className="text-muted-foreground">{language === "ms" ? "Bukan Ahli: RM30/kad" : "Non-Member: RM30/card"}</p>
                      </div>
                      <div>
                        <p className="font-semibold">RFID (Motosikal):</p>
                        <p className="text-muted-foreground">{language === "ms" ? "Ahli: RM30/keping" : "Member: RM30/pc"}</p>
                        <p className="text-muted-foreground">{language === "ms" ? "Bukan Ahli: RM35/keping" : "Non-Member: RM35/pc"}</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="font-semibold">{language === "ms" ? "Pembayaran:" : "Payment:"}</p>
                      <p className="text-muted-foreground">Bank: RHB</p>
                      <p className="text-muted-foreground">{language === "ms" ? "Nama: Persatuan Penduduk The Strata" : "Name: Persatuan Penduduk The Strata"}</p>
                      <p className="text-muted-foreground">{language === "ms" ? "No Akaun: 2124 5760 0724 81" : "Account No: 2124 5760 0724 81"}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-accent/20 border-accent">
                  <CardContent className="p-4 text-sm">
                    <p className="text-accent-foreground">
                      {language === "ms" 
                        ? "⚠️ Permohonan tidak lengkap tidak akan diproses. Tempoh proses: 7 hari bekerja."
                        : "⚠️ Incomplete applications will not be processed. Processing time: 7 working days."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Useful Contacts Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("guide.contacts.title")}
              </h2>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {usefulContacts.map((section, idx) => (
                  <Card key={idx} className="bg-card shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold text-primary">
                        {section.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {section.contacts.map((contact, cIdx) => (
                        <div key={cIdx} className="text-xs border-b last:border-0 pb-2 last:pb-0">
                          <p className="font-medium text-foreground">{contact.name}</p>
                          {contact.address && (
                            <p className="text-muted-foreground">{contact.address}</p>
                          )}
                          {contact.description && (
                            <p className="text-muted-foreground">{contact.description}</p>
                          )}
                          {contact.hours && (
                            <p className="text-muted-foreground italic">{contact.hours}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-1">
                            {contact.phone && (
                              <span className="inline-flex items-center gap-1 text-primary">
                                <Phone className="w-3 h-3" />
                                {contact.phone}
                              </span>
                            )}
                            {contact.email && (
                              <span className="inline-flex items-center gap-1 text-primary">
                                <Mail className="w-3 h-3" />
                                {contact.email}
                              </span>
                            )}
                            {contact.website && (
                              <span className="inline-flex items-center gap-1 text-primary">
                                <Globe className="w-3 h-3" />
                                {contact.website}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ResidentGuidelines;
