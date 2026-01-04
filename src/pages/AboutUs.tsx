import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Shield, Heart, Download, CheckCircle } from "lucide-react";
import heroBuilding from "@/assets/hero-building.jpg";
import sijilPendaftaran from "@/assets/sijil-pendaftaran.png";
import cartaOrganisasi from "@/assets/carta-organisasi-2024-2026.jpg";
import faedahAhli from "@/assets/faedah-ahli-persatuan.jpg";
import mengapaDaftar from "@/assets/mengapa-daftar-ahli.png";

const AboutUs = () => {
  const { language } = useLanguage();

  const objectives = language === "ms" ? [
    "Mewujudkan perpaduan di kalangan penduduk pelbagai kaum, agama dan keturunan.",
    "Meningkatkan kesedaran di kalangan penduduk tentang kepentingan peranan mereka dalam mencegah aktiviti tidak sihat seperti jenayah, gejala sosial serta memupuk sifat bertanggungjawab dan berdisiplin di kalangan mereka.",
    "Menganjurkan aktiviti berasaskan pendidikan, kebudayaan, kemasyarakatan, etika, kebajikan dan akhlak untuk penduduk setempat.",
    "Memupuk dan menggalakkan gaya hidup sihat untuk penduduk setempat.",
    "Bertindak sebagai penghubung antara penduduk, pemaju dan pihak berkuasa berhubung masalah penduduk.",
    "Menyediakan perkhidmatan terbaik untuk keselamatan dan harta benda penduduk setempat.",
  ] : [
    "Creating unity among residents of various races, religions and nationalities.",
    "To increase awareness among residents about the importance of their role in preventing unhealthy activities such as crime, social ills and fostering the qualities of responsibility and discipline among them.",
    "Organizing activities based on education, culture, social, ethics, welfare and morality for local residents.",
    "Foster and promote a healthy lifestyle for local residents.",
    "Act as a mediator between residents, developers and authorities regarding resident problems.",
    "Providing the best service for the safety and property of local residents.",
  ];

  const values = [
    {
      icon: Shield,
      title: language === "ms" ? "Keselamatan" : "Safety",
      description: language === "ms" 
        ? "Memastikan persekitaran yang selamat untuk semua penduduk."
        : "Ensuring a safe environment for all residents."
    },
    {
      icon: Users,
      title: language === "ms" ? "Komuniti" : "Community",
      description: language === "ms" 
        ? "Membina hubungan yang erat antara jiran-jiran."
        : "Building strong relationships among neighbors."
    },
    {
      icon: Target,
      title: language === "ms" ? "Ketelusan" : "Transparency",
      description: language === "ms" 
        ? "Pengurusan yang telus dan bertanggungjawab."
        : "Transparent and accountable management."
    },
    {
      icon: Heart,
      title: language === "ms" ? "Keprihatinan" : "Care",
      description: language === "ms" 
        ? "Mengutamakan kebajikan dan keperluan penduduk."
        : "Prioritizing the welfare and needs of residents."
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary/90 to-primary">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroBuilding})` }}
          />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {language === "ms" ? "Tentang Kami" : "About Us"}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {language === "ms" 
                ? "Persatuan Penduduk The Strata Bandar Puteri Bangi (PPTSBPB)"
                : "The Strata Bandar Puteri Bangi Residents' Association (PPTSBPB)"}
            </p>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-1 bg-primary mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {language === "ms" ? "Visi & Misi Kami" : "Our Vision & Mission"}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-card shadow-lg border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">
                      {language === "ms" ? "Visi" : "Vision"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {language === "ms" 
                        ? "Menjadi komuniti perumahan yang paling selamat, terurus dan harmoni di Bandar Puteri Bangi."
                        : "To become the safest, well-managed, and harmonious residential community in Bandar Puteri Bangi."}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-lg border-l-4 border-l-accent">
                  <CardHeader>
                    <CardTitle className="text-xl text-accent">
                      {language === "ms" ? "Misi" : "Mission"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {language === "ms" 
                        ? "Menyediakan perkhidmatan keselamatan dan pengurusan yang berkualiti untuk kesejahteraan semua penduduk The Strata."
                        : "To provide quality security and management services for the well-being of all The Strata residents."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {language === "ms" ? "Objektif Penubuhan" : "Objectives of Establishment"}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                PPM-016-10-18062021
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
              {/* Certificate Image */}
              <div className="flex justify-center">
                <img 
                  src={sijilPendaftaran} 
                  alt="Sijil Pendaftaran Persatuan" 
                  className="max-w-sm w-full rounded-lg shadow-lg bg-white p-4"
                />
              </div>

              {/* Objectives List */}
              <div className="space-y-4">
                {objectives.map((objective, idx) => (
                  <Card key={idx} className="bg-card shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{objective}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {language === "ms" ? "Nilai-Nilai Kami" : "Our Values"}
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, idx) => (
                <Card key={idx} className="bg-card shadow-md text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Committee Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {language === "ms" ? "Ahli Jawatankuasa Persatuan 2024/2026" : "Association Committee 2024/2026"}
              </h2>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <img 
                src={cartaOrganisasi} 
                alt="Carta Organisasi 2024/2026" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Benefits of Membership Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {language === "ms" ? "Faedah Menjadi Ahli Persatuan Penduduk The Strata" : "Benefits of Becoming a Member"}
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <img 
                src={faedahAhli} 
                alt="Faedah Menjadi Ahli Persatuan" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Why Register Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {language === "ms" ? "Mengapa Perlu Mendaftar Sebagai Ahli Persatuan Penduduk" : "Why Register as a Member"}
              </h2>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <img 
                src={mengapaDaftar} 
                alt="Mengapa Perlu Mendaftar" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Become a Member Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {language === "ms" ? "Menjadi Ahli Persatuan" : "Become a Member"}
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    {language === "ms" ? "Syarat Pendaftaran" : "Registration Requirements"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>
                      {language === "ms" 
                        ? "Terbuka kepada semua pemilik atau ahli keluarga pemilik atau penyewa rumah di The Strata Bandar Puteri Bangi yang berumur 18 tahun ke atas dan warganegara Malaysia tetapi dihadkan kepada maksimum 2 keahlian bagi setiap unit pada satu masa."
                        : "Open to all owners or family members of owners or tenants of houses in The Strata Bandar Puteri Bangi who are 18 years old and above and Malaysian citizens but limited to a maximum of 2 memberships per unit at any one time."}
                    </p>
                    <p>
                      {language === "ms" 
                        ? "Tiap-tiap pemohon yang permohonannya telah diluluskan hendaklah setelah membayar bayaran pendaftaran dan yuran bulanan security seperti yang ditetapkan diterima menjadi ahli Persatuan dan berhaklah ia sebagai ahli."
                        : "Each applicant whose application has been approved shall, after paying the registration fee and monthly security fee as prescribed, be admitted as a member of the Association and shall be entitled as a member."}
                    </p>
                    <p className="italic text-xs">
                      {language === "ms" 
                        ? "Notis pengumpulan data peribadi: Maklumat peribadi yang dikumpul hanya bertujuan untuk pembuktian kewarganegaraan dan pemberitahuan notis sekiranya berlaku sebarang kecemasan yang memerlukan waris terdekat dihubungi."
                        : "Personal data collection notice: Personal information collected is only for the purpose of proving citizenship and notifying in case of any emergency that requires next of kin to be contacted."}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="text-center p-4 bg-card rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-foreground">
                        {language === "ms" ? "Yuran Pendaftaran" : "Registration Fee"}
                      </p>
                      <p className="text-2xl font-bold text-primary mt-1">RM 20.00</p>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-foreground">
                        {language === "ms" ? "Yuran Tahunan" : "Annual Fee"}
                      </p>
                      <p className="text-2xl font-bold text-primary mt-1">RM 20.00</p>
                    </div>
                  </div>

                  <Card className="bg-accent/10 border-accent/30">
                    <CardContent className="p-4">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        {language === "ms" ? "Nota:" : "Note:"}
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        <li>
                          {language === "ms" 
                            ? "Sila kemukakan salinan muka hadapan Perjanjian Jual Beli / Kontrak Sewaan (yang mana berkaitan) sebagai bukti kelayakan menyertai persatuan."
                            : "Please submit a copy of the front page of the Sale and Purchase Agreement / Rental Contract (whichever applicable) as proof of eligibility to join the association."}
                        </li>
                        <li>
                          {language === "ms" 
                            ? "Slip pembayaran dan borang yang telah diisi dan ditandatangani boleh dihantar secara serahan tangan kepada Ketua Lorong."
                            : "Payment slip and completed and signed form can be submitted by hand to the Lane Head."}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="text-center pt-4">
                    <Button 
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => window.open("https://thestrata.com.my/joomla30/images/Download/BORANG%20KEAHLIAN%20THE%20STRATA.pdf", "_blank")}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      {language === "ms" ? "Muat Turun Borang Keahlian" : "Download Membership Form"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {language === "ms" ? "Hubungi Kami" : "Contact Us"}
              </h2>
              <Card className="bg-card shadow-lg">
                <CardContent className="p-8">
                  <p className="text-muted-foreground mb-4">
                    <strong>{language === "ms" ? "Alamat:" : "Address:"}</strong><br />
                    The Strata, Bandar Puteri Bangi,<br />
                    43000 Kajang, Selangor
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong>{language === "ms" ? "E-mel:" : "Email:"}</strong><br />
                    thestratapayment@gmail.com
                  </p>
                  <p className="text-muted-foreground">
                    <strong>{language === "ms" ? "Laman Web:" : "Website:"}</strong><br />
                    <a href="https://thestrata.com.my" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      thestrata.com.my
                    </a>
                  </p>
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

export default AboutUs;
