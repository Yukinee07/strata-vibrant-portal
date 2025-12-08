import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { Book, Download, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const announcements = [
  {
    date: "12 Oct",
    title: "AGM Meeting Scheduled",
    excerpt: "The Annual General Meeting for all residents has been scheduled. Your participation is crucial for community decisions regarding maintenance fees and facility upgrades.",
  },
  {
    date: "05 Oct",
    title: "Lift Maintenance Alert",
    excerpt: "Scheduled maintenance for Lift B in Block A will occur on October 15th from 9AM to 5PM. Please use alternative lifts during this period.",
  },
  {
    date: "28 Sep",
    title: "New Parking Guidelines",
    excerpt: "Updated parking regulations will take effect from November 1st. All residents are required to register their vehicles with the management office.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Main Content Area - Two Column Layout */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - 70% - Announcements */}
              <div className="lg:w-[70%]">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Community News & Events
                  </h2>
                  <div className="w-16 h-1 bg-accent rounded-full"></div>
                </div>

                <div className="space-y-6">
                  {announcements.map((item, index) => (
                    <article
                      key={index}
                      className="bg-card rounded-lg p-6 border-l-4 border-accent shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-accent text-accent-foreground px-3 py-2 rounded text-sm font-semibold whitespace-nowrap">
                          {item.date}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-primary mb-2">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            {item.excerpt}
                          </p>
                          <Link
                            to="#"
                            className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
                          >
                            Read More <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Right Column - 30% - Quick Links Sidebar */}
              <aside className="lg:w-[30%]">
                <div className="bg-secondary rounded-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Resident Resources
                  </h3>

                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link to="/guide">
                        <Book className="w-5 h-5" />
                        <span className="font-medium">View Residents' Guide</span>
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link to="/forms">
                        <Download className="w-5 h-5" />
                        <span className="font-medium">Download Forms</span>
                      </Link>
                    </Button>
                  </div>

                  {/* Need Help Widget */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-4">
                      Need Help?
                    </h4>
                    <div className="space-y-3">
                      <a
                        href="mailto:management@thestrata.com"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        management@thestrata.com
                      </a>
                      <a
                        href="tel:+60389120000"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        +603-8912 0000
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
