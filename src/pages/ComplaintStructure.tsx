import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const ComplaintStructure = () => {
  const { t } = useLanguage();

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-secondary">
        {/* Page Title */}
        <div className="bg-background py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              {t("complaint.title")}
            </h1>
          </div>
        </div>

        {/* Complaint Structure Card */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-primary/90 to-primary rounded-2xl p-8 md:p-12 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                {t("complaint.subtitle")}
              </h2>
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
                        <h3 className="text-primary-foreground font-bold text-sm mb-2 uppercase">
                          {t("complaint.issues")}
                        </h3>
                      )}
                      <p className="text-primary-foreground text-sm">{item.issue}</p>
                    </div>
                  </div>

                  {/* Action Column */}
                  <div className="lg:col-span-3 bg-background rounded-lg p-4">
                    {index === 0 && (
                      <h3 className="text-foreground font-bold text-sm mb-2 uppercase text-center">
                        {t("complaint.action")}
                      </h3>
                    )}
                    <p className="text-muted-foreground text-sm">{item.action}</p>
                  </div>

                  {/* Duration Column */}
                  <div className="lg:col-span-3 bg-background rounded-lg p-4">
                    {index === 0 && (
                      <h3 className="text-foreground font-bold text-sm mb-2 uppercase text-center">
                        {t("complaint.duration")}
                      </h3>
                    )}
                    <p className="text-muted-foreground text-sm">{item.duration}</p>
                  </div>

                  {/* Notes Column */}
                  <div className="lg:col-span-3 bg-background rounded-lg p-4">
                    {index === 0 && (
                      <h3 className="text-foreground font-bold text-sm mb-2 uppercase text-center">
                        {t("complaint.notes")}
                      </h3>
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
      </main>
      <Footer />
    </div>
  );
};

export default ComplaintStructure;
