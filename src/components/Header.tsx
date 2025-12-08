import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, Building2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#", active: true },
    {
      name: "About Us",
      href: "#",
      dropdown: ["Our Community", "Committee Members", "History"],
    },
    {
      name: "Information",
      href: "#",
      dropdown: ["Guidelines", "Forms & Documents", "Security Info", "JaGaApp 2.0"],
    },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b-2 border-primary shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-lg md:text-xl font-bold text-foreground tracking-tight">
              THE STRATA COMMUNITY
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors font-medium">
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background border border-border shadow-lg z-50">
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem
                        key={item}
                        className="cursor-pointer hover:bg-secondary focus:bg-secondary"
                      >
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    link.active
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <Button variant="default" size="lg" className="font-semibold">
              RESIDENT PORTAL LOGIN
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    className={`block font-medium py-2 ${
                      link.active ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    {link.name}
                  </a>
                  {link.dropdown && (
                    <div className="pl-4 mt-2 space-y-2">
                      {link.dropdown.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block text-muted-foreground hover:text-primary py-1 text-sm"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button variant="default" className="mt-4 w-full font-semibold">
                RESIDENT PORTAL LOGIN
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
