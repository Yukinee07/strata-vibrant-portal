import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Building2, Lock, Mail, Moon, Sun, Languages, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useDeveloper } from "@/contexts/DeveloperContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import heroImage from "@/assets/hero-building.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { login: developerLogin } = useDeveloper();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if credentials match Developer (special case)
    if (email === "Developer" && password === "Developer") {
      const success = developerLogin(email, password);
      if (success) {
        toast.success(language === "ms" ? "Log masuk pembangun berjaya!" : "Developer login successful!");
        navigate("/dashboard");
        setIsLoading(false);
        return;
      }
    }
    
    // Regular Supabase authentication
    const { error } = await signIn(email, password);
    
    if (error) {
      toast.error(language === "ms" ? "Log masuk gagal. Sila semak e-mel dan kata laluan anda." : "Login failed. Please check your email and password.");
    } else {
      toast.success(language === "ms" ? "Log masuk berjaya!" : "Login successful!");
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image with Green Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src={heroImage}
          alt="The Strata Community"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12">
          <Building2 className="w-16 h-16 text-primary-foreground mb-6" />
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            The Strata Community
          </h1>
          <p className="text-primary-foreground/90 text-lg max-w-md">
            {t("hero.tagline")}
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
                <Building2 className="w-10 h-10 text-primary" />
                <span className="text-2xl font-bold text-foreground">The Strata</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground text-center mb-2">
              {t("login.title")}
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              {language === "ms" 
                ? "Masukkan maklumat anda untuk mengakses akaun" 
                : "Enter your credentials to access your account"}
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{language === "ms" ? "E-mel" : "Email"}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="text"
                    placeholder={language === "ms" ? "Masukkan e-mel anda" : "Enter your email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-input focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("login.password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={language === "ms" ? "Masukkan kata laluan anda" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-input focus:border-primary focus:ring-primary"
                    required
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

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    {t("login.remember")}
                  </Label>
                </div>
                <Link to="/forgot-password" className="text-sm font-medium text-accent hover:underline">
                  {t("login.forgot")}
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading 
                  ? (language === "ms" ? "Memproses..." : "Processing...") 
                  : t("login.submit")}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              {t("login.noAccount")}
            </p>

            <div className="mt-8 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ← {language === "ms" ? "Kembali ke Halaman Utama" : "Back to Homepage"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
