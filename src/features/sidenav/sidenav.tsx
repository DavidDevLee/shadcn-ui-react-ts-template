import { useState, useRef } from "react";
import {
  Home,
  Settings,
  Users,
  Mail,
  ChevronLeft,
  ChevronRight,
  Chrome,
  Facebook,
  Bike,
  Watch,
  LogIn,
  Plus,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/overlay/tooltip";
import AuthDialog from "./components/auth-dialog";
import { AuthProvider } from "./types/auth-provider";
import type { LucideIcon } from "lucide-react";
import type { SignInCredentials } from "@/shared/types/user";

interface MenuItem {
  icon: LucideIcon;
  label: string;
}

export const SideNav = () => {
  const [expanded, setExpanded] = useState(true);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [signInData, setSignInData] = useState<SignInCredentials>({
    email: "",
    password: "",
  });

  const menuItems: MenuItem[] = [
    { icon: Home, label: "Home" },
    { icon: Users, label: "Users" },
    { icon: Mail, label: "Messages" },
    { icon: Settings, label: "Settings" },
  ];

  const quickSignInProviders = [
    {
      provider: AuthProvider.GOOGLE,
      icon: Chrome,
      label: "Sign in with Google",
    },
    {
      provider: AuthProvider.FACEBOOK,
      icon: Facebook,
      label: "Sign in with Facebook",
    },
    { provider: AuthProvider.STRAVA, icon: Bike, label: "Sign in with Strava" },
    {
      provider: AuthProvider.GARMIN,
      icon: Watch,
      label: "Sign in with Garmin",
    },
  ];

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Email sign in with:", signInData);
      // await signIn(signInData);
    } catch (error) {
      console.error("Email sign in failed:", error);
    }
  };

  const handleSocialAuth = async (provider: AuthProvider) => {
    try {
      console.log(`Quick sign in with ${provider}`);
      // await socialSignIn(provider);
    } catch (error) {
      console.error("Social auth failed:", error);
    }
  };

  const handleExpandToggle = () => {
    setExpanded(!expanded);
    // Hide sign in if we're collapsing the nav
    if (expanded) {
      setShowSignIn(false);
    }
  };

  const handleSignInClick = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => setShowSignIn(true), 150);
    } else {
      setShowSignIn(true);
    }
  };

  const handleSignInClose = () => {
    setShowSignIn(false);
  };

  return (
    <>
      <aside
        className={cn(
          "h-screen bg-white dark:bg-gray-800 border-r transition-all duration-150 ease-in-out",
          expanded ? "w-64" : "w-16"
        )}
      >
        <nav className="h-full flex flex-col">
          <div className="p-4 flex justify-between items-center relative">
            <div
              className={cn(
                "transition-all duration-150 overflow-hidden",
                expanded ? "w-24" : "w-0"
              )}
            >
              <span className="font-semibold whitespace-nowrap">Dashboard</span>
            </div>
            <button
              onClick={handleExpandToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {expanded ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex-1 px-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={cn(
                  "w-full flex items-center p-2 mb-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                  expanded ? "justify-start" : "justify-center"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span
                  className={cn(
                    "ml-4 transition-opacity duration-150",
                    expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="p-4 space-y-2">
            {expanded && showSignIn ? (
              <>
                <form onSubmit={handleEmailSignIn} className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="pl-9"
                      value={signInData.email}
                      onChange={(e) =>
                        setSignInData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Password"
                      className="pl-9"
                      value={signInData.password}
                      onChange={(e) =>
                        setSignInData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Sign In
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleSignInClose}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                </form>

                <div className="flex flex-wrap gap-2">
                  <TooltipProvider>
                    {quickSignInProviders.map(
                      ({ provider, icon: Icon, label }) => (
                        <Tooltip key={provider} delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-full"
                              onClick={() => handleSocialAuth(provider)}
                            >
                              <Icon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{label}</p>
                          </TooltipContent>
                        </Tooltip>
                      )
                    )}
                  </TooltipProvider>
                </div>
              </>
            ) : (
              <div
                className={cn(
                  "flex gap-2 transition-all duration-150",
                  !expanded && "flex-col items-center"
                )}
              >
                <Button
                  className={cn("flex-1", !expanded && "w-full px-0")}
                  onClick={handleSignInClick}
                >
                  <LogIn className="h-4 w-4" />
                  {expanded && <span className="ml-2">Sign In</span>}
                </Button>
                <Button
                  variant="outline"
                  className={cn("flex-1", !expanded && "w-full px-0")}
                  onClick={() => {
                    setAuthMode("signup");
                    setShowAuthDialog(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  {expanded && <span className="ml-2">Sign Up</span>}
                </Button>
              </div>
            )}
          </div>
        </nav>
      </aside>

      <AuthDialog
        isOpen={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        defaultTab={authMode}
      />
    </>
  );
};
