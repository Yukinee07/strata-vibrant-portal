import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Shield, Heart } from "lucide-react";
import heroBuilding from "@/assets/hero-building.jpg";

const AboutUs = () => {
  const { language } = useLanguage();

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

        {/* About Section */}
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

              {/* History */}
              <Card className="bg-card shadow-lg mb-12">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    {language === "ms" ? "Sejarah Persatuan" : "Association History"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === "ms" 
                      ? "Persatuan Penduduk The Strata Bandar Puteri Bangi (PPTSBPB) telah ditubuhkan untuk menjaga kepentingan dan kebajikan penduduk kawasan perumahan The Strata. Persatuan ini beroperasi secara sukarela dengan kerjasama semua penduduk untuk memastikan kawasan kediaman yang selamat dan selesa."
                      : "The Strata Bandar Puteri Bangi Residents' Association (PPTSBPB) was established to safeguard the interests and welfare of residents in The Strata residential area. The association operates on a voluntary basis with the cooperation of all residents to ensure a safe and comfortable living environment."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/50">
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

        {/* Contact Info */}
        <section className="py-16 bg-background">
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
  );
};

export default AboutUs;
