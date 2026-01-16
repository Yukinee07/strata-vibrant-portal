import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useDeveloper } from "@/contexts/DeveloperContext";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Sun, Moon, Home, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { login: developerLogin } = useDeveloper();
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Sign In state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sign Up state
  const [signUpFullName, setSignUpFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check for Developer login
    if (email === "Developer" && password === "Developer") {
      developerLogin(email, password);
      toast.success("Developer mode activated");
      navigate("/dashboard");
      setIsLoading(false);
      return;
    }

    try {
      await signIn(email, password);
      toast.success(t("login.success") || "Successfully signed in!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || t("login.error") || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signUpFullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (signUpPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsSignUpLoading(true);

    try {
      await signUp(signUpEmail, signUpPassword, signUpFullName);
      toast.success("Account created successfully! You are now signed in.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Sign up failed");
    } finally {
      setIsSignUpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-foreground/20" />
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-primary-foreground">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold mb-6">
              {language === "ms" ? "Selamat Datang" : "Welcome Back"}
            </h1>
            <p className="text-lg opacity-90">
              {language === "ms"
                ? "Log masuk untuk mengakses portal penduduk anda"
                : "Sign in to access your resident portal"}
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Top bar with theme and language toggle */}
        <div className="flex justify-between items-center p-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <Home className="h-4 w-4" />
            <span className="text-sm">{t("nav.home")}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ms" : "en")}
              className="text-sm"
            >
              {language === "en" ? "BM" : "EN"}
            </Button>
          </div>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {language === "ms" ? "Portal Penduduk" : "Resident Portal"}
              </h2>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">
                  {language === "ms" ? "Log Masuk" : "Sign In"}
                </TabsTrigger>
                <TabsTrigger value="signup">
                  {language === "ms" ? "Daftar" : "Sign Up"}
                </TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {t("login.email")}
                    </label>
                    <Input
                      id="email"
                      type="text"
                      placeholder={t("login.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                      {t("login.password")}
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("login.passwordPlaceholder")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                          setRememberMe(checked as boolean)
                        }
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {t("login.rememberMe")}
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      {t("login.forgotPassword")}
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? t("login.processing")
                      : t("login.signIn")}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                      {language === "ms" ? "Nama Penuh" : "Full Name"}
                    </label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={language === "ms" ? "Masukkan nama penuh" : "Enter your full name"}
                      value={signUpFullName}
                      onChange={(e) => setSignUpFullName(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signUpEmail" className="text-sm font-medium text-foreground">
                      {t("login.email")}
                    </label>
                    <Input
                      id="signUpEmail"
                      type="email"
                      placeholder={t("login.emailPlaceholder")}
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signUpPassword" className="text-sm font-medium text-foreground">
                      {t("login.password")}
                    </label>
                    <div className="relative">
                      <Input
                        id="signUpPassword"
                        type={showSignUpPassword ? "text" : "password"}
                        placeholder={language === "ms" ? "Minimum 6 aksara" : "Minimum 6 characters"}
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        required
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showSignUpPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                      {language === "ms" ? "Sahkan Kata Laluan" : "Confirm Password"}
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={language === "ms" ? "Masukkan kata laluan sekali lagi" : "Enter password again"}
                        value={signUpConfirmPassword}
                        onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                        required
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11"
                    disabled={isSignUpLoading}
                  >
                    {isSignUpLoading
                      ? t("login.processing")
                      : language === "ms" ? "Daftar Akaun" : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
