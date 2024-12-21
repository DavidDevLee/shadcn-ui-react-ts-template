import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AuthProvider } from "../types/auth-provider";
import type { LucideIcon } from "lucide-react";
import {
  Chrome,
  Facebook,
  Twitter,
  Apple,
  Bike,
  Watch,
  Activity,
} from "lucide-react";

interface SocialAuthButtonProps {
  provider: AuthProvider;
  onAuth: (provider: AuthProvider) => void;
  loading?: boolean;
}

interface ProviderDetails {
  icon: LucideIcon;
  label: string;
  class: string;
}

const SocialAuthButton = ({
  provider,
  onAuth,
  loading,
}: SocialAuthButtonProps) => {
  const providerDetails: Record<AuthProvider, ProviderDetails> = {
    [AuthProvider.GOOGLE]: {
      icon: Chrome,
      label: "Continue with Google",
      class: "hover:bg-red-50 border-red-200 dark:hover:bg-red-950",
    },
    [AuthProvider.FACEBOOK]: {
      icon: Facebook,
      label: "Continue with Facebook",
      class: "hover:bg-blue-50 border-blue-200 dark:hover:bg-blue-950",
    },
    [AuthProvider.APPLE]: {
      icon: Apple,
      label: "Continue with Apple",
      class: "hover:bg-gray-50 border-gray-200 dark:hover:bg-gray-800",
    },
    [AuthProvider.TWITTER]: {
      icon: Twitter,
      label: "Continue with Twitter",
      class: "hover:bg-blue-50 border-blue-200 dark:hover:bg-blue-950",
    },
    [AuthProvider.STRAVA]: {
      icon: Bike,
      label: "Continue with Strava",
      class: "hover:bg-orange-50 border-orange-200 dark:hover:bg-orange-950",
    },
    [AuthProvider.GARMIN]: {
      icon: Watch,
      label: "Continue with Garmin",
      class: "hover:bg-green-50 border-green-200 dark:hover:bg-green-950",
    },
    [AuthProvider.FITBIT]: {
      icon: Activity,
      label: "Continue with Fitbit",
      class: "hover:bg-indigo-50 border-indigo-200 dark:hover:bg-indigo-950",
    },
    [AuthProvider.EMAIL]: {
      icon: Chrome,
      label: "Continue with Email",
      class: "hover:bg-gray-50 border-gray-200 dark:hover:bg-gray-800",
    },
  };

  const details = providerDetails[provider];

  const Icon = details.icon;

  return (
    <Button
      variant="outline"
      className={`w-full relative ${details.class}`}
      onClick={() => onAuth(provider)}
      disabled={loading}
    >
      <Icon className="mr-2 h-4 w-4" />
      {details.label}
    </Button>
  );
};

interface SocialAuthProps {
  onAuth: (provider: AuthProvider) => void;
  loading?: boolean;
  showFitness?: boolean;
}

export const SocialAuth = ({
  onAuth,
  loading,
  showFitness = true,
}: SocialAuthProps) => {
  const generalProviders = [
    AuthProvider.GOOGLE,
    AuthProvider.FACEBOOK,
    AuthProvider.APPLE,
  ];

  const fitnessProviders = [
    AuthProvider.STRAVA,
    AuthProvider.GARMIN,
    AuthProvider.FITBIT,
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {generalProviders.map((provider) => (
          <SocialAuthButton
            key={provider}
            provider={provider}
            onAuth={onAuth}
            loading={loading}
          />
        ))}
      </div>

      {showFitness && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Fitness Platforms
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {fitnessProviders.map((provider) => (
              <SocialAuthButton
                key={provider}
                provider={provider}
                onAuth={onAuth}
                loading={loading}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SocialAuth;
