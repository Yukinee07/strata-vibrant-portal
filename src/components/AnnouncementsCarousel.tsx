import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Announcement {
  id: number;
  title: string;
  image: string;
  type: "event" | "payment" | "app";
}

const AnnouncementsCarousel = () => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const announcements: Announcement[] = [
    {
      id: 1,
      title: language === "ms" ? "HARI KELUARGA 2025" : "FAMILY DAY 2025",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
      type: "event",
    },
    {
      id: 2,
      title: language === "ms" ? "DAH BAYAR KE YURAN SEKURITI?" : "HAVE YOU PAID SECURITY FEE?",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      type: "payment",
    },
    {
      id: 3,
      title: language === "ms" ? "JAGAAPP 2.0 KINI DI SINI!" : "JAGAAPP 2.0 NOW AVAILABLE!",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      type: "app",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-secondary py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          {t("announcements.title")}
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Cards Container */}
          <div className="flex justify-center items-center gap-4 md:gap-6">
            {announcements.map((announcement, index) => {
              const isActive = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + announcements.length) % announcements.length;
              const isNext = index === (currentIndex + 1) % announcements.length;

              let position = "hidden";
              if (isActive) position = "center";
              else if (isPrev) position = "left";
              else if (isNext) position = "right";

              return (
                <div
                  key={announcement.id}
                  className={`transition-all duration-500 ${
                    position === "center"
                      ? "scale-100 opacity-100 z-10"
                      : position === "left" || position === "right"
                      ? "scale-75 opacity-50 hidden md:block"
                      : "hidden"
                  }`}
                >
                  <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow w-[280px] md:w-[320px]">
                    <div className="relative h-48 md:h-56">
                      <img
                        src={announcement.image}
                        alt={announcement.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-primary-foreground font-bold text-lg leading-tight">
                          {announcement.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-background/80 hover:bg-background rounded-full shadow-lg transition-colors hidden md:block"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-background/80 hover:bg-background rounded-full shadow-lg transition-colors hidden md:block"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsCarousel;
