import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Code, Lock, User, Moon, Sun, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useDeveloper } from "@/contexts/DeveloperContext";
import { toast } from "sonner";
import heroImage from "@/assets/hero-building.jpg";

const DeveloperLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { login } = useDeveloper();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      toast.success(language === "ms" ? "Log masuk berjaya!" : "Login successful!");
      navigate("/");
    } else {
      toast.error(language === "ms" ? "Nama pengguna atau kata laluan salah" : "Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image with Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src={heroImage}
          alt="The Strata Community"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-accent/80"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12">
          <Code className="w-16 h-16 text-accent-foreground mb-6" />
          <h1 className="text-4xl font-bold text-accent-foreground mb-4">
            Developer Portal
          </h1>
          <p className="text-accent-foreground/90 text-lg max-w-md">
            {language === "ms" 
              ? "Akses pentadbir untuk mengedit kandungan laman web" 
              : "Admin access to edit website content"}
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 bg-background">
        {/* Top Toggles */}
        <div className="flex justify-end gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">BM</span>
            <Switch
              checked={language === "en"}
              onCheckedChange={(checked) => setLanguage(checked ? "en" : "ms")}
              className="data-[state=checked]:bg-primary"
            />
            <span className="text-xs font-medium text-muted-foreground">EN</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-muted-foreground" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-primary"
            />
            <Moon className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2">
                <Code className="w-10 h-10 text-accent" />
                <span className="text-2xl font-bold text-foreground">Developer</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground text-center mb-2">
              {language === "ms" ? "Log Masuk Pembangun" : "Developer Login"}
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              {language === "ms" 
                ? "Masukkan maklumat pembangun untuk mengakses mod penyuntingan" 
                : "Enter developer credentials to access edit mode"}
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">
                  {language === "ms" ? "Nama Pengguna" : "Username"}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder={language === "ms" ? "Masukkan nama pengguna" : "Enter username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 border-input focus:border-accent focus:ring-accent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  {language === "ms" ? "Kata Laluan" : "Password"}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={language === "ms" ? "Masukkan kata laluan" : "Enter password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-input focus:border-accent focus:ring-accent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90">
                {language === "ms" ? "Log Masuk" : "Login"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                ← {language === "ms" ? "Kembali ke Halaman Utama" : "Back to Homepage"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperLogin;
