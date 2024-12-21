export enum AuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
  TWITTER = 'twitter',
  STRAVA = 'strava',
  GARMIN = 'garmin',
  FITBIT = 'fitbit',
  EMAIL = 'email'
}

export interface SocialAuthProfile {
  provider: AuthProvider;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  scopes?: string[];
  lastSync?: Date;
}

export interface FitnessPlatformSync {
  platform: AuthProvider;
  lastSync: Date;
  nextScheduledSync?: Date;
  status: 'active' | 'disconnected' | 'error';
  error?: string;
}

export interface AuthProviderConfig {
  provider: AuthProvider;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  enabled: boolean;
  icon: string; 
  displayName: string;
}