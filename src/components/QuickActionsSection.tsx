import { Book, Download, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const quickActions = [
  {
    icon: Book,
    title: "Community Guidelines",
    description: "Rules, regulations, and living guides for all residents.",
    link: "Read Guide →",
  },
  {
    icon: Download,
    title: "Application Forms",
    description: "Renovation, moving in/out, and access card applications.",
    link: "View Forms →",
  },
  {
    icon: Headphones,
    title: "Office & Security",
    description: "Need assistance? Get in touch with our team.",
    link: "Contact Info →",
  },
];

const QuickActionsSection = () => {
  return (
    <section className="bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {quickActions.map((action, index) => (
            <Card
              key={action.title}
              className="bg-card border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 md:p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  <action.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {action.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {action.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-primary font-semibold hover:underline transition-colors"
                >
                  {action.link}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActionsSection;
