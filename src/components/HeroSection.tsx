import heroImage from "@/assets/hero-building.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 animate-fade-up">
          Welcome Home to The Strata
        </h1>
        <p 
          className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          A secure, connected, and vibrant community at Bandar Puteri Bangi
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
