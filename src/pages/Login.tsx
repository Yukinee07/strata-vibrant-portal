import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Sun, Moon, Home, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";

// Validation schemas
const emailSchema = z.string().trim().email("Invalid email address").max(255);
const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(128);
const nameSchema = z.string().trim().min(1, "Name is required").max(100);

const Login = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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

  // Forgot Password state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate email
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      toast.error(language === "ms" ? "Alamat e-mel tidak sah" : "Invalid email address");
      setIsLoading(false);
      return;
    }

    // Validate password
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      toast.error(language === "ms" ? "Kata laluan mesti sekurang-kurangnya 6 aksara" : "Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signIn(emailResult.data, password);
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error(language === "ms" ? "E-mel atau kata laluan tidak sah" : "Invalid email or password");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error(language === "ms" ? "Sila sahkan e-mel anda terlebih dahulu" : "Please confirm your email first");
        } else {
          toast.error(error.message || t("login.error") || "Sign in failed");
        }
      } else {
        toast.success(t("login.success") || "Successfully signed in!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || t("login.error") || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate full name
    const nameResult = nameSchema.safeParse(signUpFullName);
    if (!nameResult.success) {
      toast.error(language === "ms" ? "Sila masukkan nama penuh anda" : "Please enter your full name");
      return;
    }

    // Validate email
    const emailResult = emailSchema.safeParse(signUpEmail);
    if (!emailResult.success) {
      toast.error(language === "ms" ? "Alamat e-mel tidak sah" : "Invalid email address");
      return;
    }

    // Validate password
    const passwordResult = passwordSchema.safeParse(signUpPassword);
    if (!passwordResult.success) {
      toast.error(language === "ms" ? "Kata laluan mesti sekurang-kurangnya 6 aksara" : "Password must be at least 6 characters");
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      toast.error(language === "ms" ? "Kata laluan tidak sepadan" : "Passwords do not match");
      return;
    }

    setIsSignUpLoading(true);

    try {
      const { error } = await signUp(emailResult.data, signUpPassword, nameResult.data);
      if (error) {
        if (error.message.includes("User already registered")) {
          toast.error(language === "ms" ? "E-mel ini telah didaftarkan. Sila log masuk." : "This email is already registered. Please sign in.");
        } else {
          toast.error(error.message || (language === "ms" ? "Pendaftaran gagal" : "Sign up failed"));
        }
      } else {
        toast.success(language === "ms" ? "Akaun berjaya dicipta! Anda kini telah log masuk." : "Account created successfully! You are now signed in.");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || (language === "ms" ? "Pendaftaran gagal" : "Sign up failed"));
    } finally {
      setIsSignUpLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailResult = emailSchema.safeParse(forgotEmail);
    if (!emailResult.success) {
      toast.error(language === "ms" ? "Alamat e-mel tidak sah" : "Invalid email address");
      return;
    }
    
    setIsForgotLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(emailResult.data, {
        redirectTo: `${window.location.origin}/login`,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success(language === "ms" 
          ? "Pautan reset kata laluan telah dihantar ke e-mel anda" 
          : "Password reset link has been sent to your email");
        setShowForgotPassword(false);
        setForgotEmail("");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Right side - Form (comes first in DOM for mobile, but visually second on desktop) */}
      <div className="w-full lg:w-1/2 flex flex-col order-1 lg:order-2 min-h-screen lg:min-h-0">
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
                      placeholder={language === "ms" ? "Masukkan e-mel anda" : "Enter your email"}
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
                        placeholder={language === "ms" ? "Masukkan kata laluan anda" : "Enter your password"}
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
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-primary hover:underline"
                    >
                      {t("login.forgotPassword")}
                    </button>
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
                      placeholder={language === "ms" ? "Masukkan nama penuh anda" : "Enter your full name"}
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
                      placeholder={language === "ms" ? "Masukkan e-mel anda" : "Enter your email"}
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

      {/* Left side - Green panel (comes second in DOM but visually first on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden order-2 lg:order-1">
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

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === "ms" ? "Lupa Kata Laluan?" : "Forgot Password?"}
            </DialogTitle>
            <DialogDescription>
              {language === "ms" 
                ? "Masukkan e-mel anda dan kami akan menghantar pautan untuk menetapkan semula kata laluan anda."
                : "Enter your email and we'll send you a link to reset your password."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="forgotEmail" className="text-sm font-medium text-foreground">
                {language === "ms" ? "E-mel" : "Email"}
              </label>
              <Input
                id="forgotEmail"
                type="email"
                placeholder={language === "ms" ? "Masukkan e-mel anda" : "Enter your email"}
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowForgotPassword(false)}
              >
                {language === "ms" ? "Batal" : "Cancel"}
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isForgotLoading}
              >
                {isForgotLoading 
                  ? (language === "ms" ? "Menghantar..." : "Sending...")
                  : (language === "ms" ? "Hantar Pautan" : "Send Link")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;