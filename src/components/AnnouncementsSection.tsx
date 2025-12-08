const announcements = [
  {
    date: "01 NOV",
    title: "Strata Family Day 2025",
    excerpt:
      "Join us for a day of fun activities, health checkups, games for all ages, and food stalls. Registration is RM20 per family.",
  },
  {
    date: "15 OCT",
    title: "JaGaApp 2.0 Now Available",
    excerpt:
      "Our new visitor and security management app is now live. Register your household to enjoy seamless visitor management.",
  },
  {
    date: "08 OCT",
    title: "Security Fee Reminder",
    excerpt:
      "Kindly ensure your monthly security contribution of RM50 is paid on time. Your support keeps our community safe.",
  },
];

const AnnouncementsSection = () => {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Latest Community News & Alerts
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
        </div>

        {/* Announcement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {announcements.map((item, index) => (
            <article
              key={item.title}
              className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                {/* Date Badge */}
                <div className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded mb-4">
                  {item.date}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-primary mb-3 group-hover:underline">
                  {item.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                
                {/* Link */}
                <a
                  href="#"
                  className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
                >
                  Read More &gt;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
