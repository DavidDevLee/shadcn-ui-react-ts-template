import { Contest } from "./contest";
import { League } from "./league";

export enum UserRole {
  USER = "user",
  TRAINER = "trainer",
  USER_TRAINER = "user-trainer"
}

export enum SubscriptionStatus {
  FREE = "free",
  TRIAL = "trial",
  TRIAL_TRAINER = "trial-trainer",
  PAID = "paid",
  PAID_TRAINER = "paid-trainer"
}

// API response type
export interface UserFromAPI {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  status: SubscriptionStatus;
  contests: Contest[];
  leagues: League[];
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

export interface UserProfile {
  avatar?: string;
  bio?: string;
  location?: string;
  timezone?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    smsUpdates: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  password: string; 
  role: UserRole;
  status: SubscriptionStatus;
  profile: UserProfile;
  contests: Contest[];
  leagues: League[];
  // achievements: {
  //   badges: string[];
  //   points: number;
  //   level: number;
  // };
  // subscription?: {
  //   planId: string;
  //   startDate: Date;
  //   endDate?: Date;
  //   autoRenew: boolean;
  //   paymentMethod?: string;
  // };
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  // notifications: {
  //   email: boolean;
  //   push: boolean;
  //   sms: boolean;
  // };
  connectedAccounts: {
    strava?: {
      athleteId: string;
      lastSync: Date;
      activities?: string[];
    };
    garmin?: {
      userId: string;
      lastSync: Date;
      deviceInfo?: string[];
    };
    fitbit?: {
      userId: string;
      lastSync: Date;
    };
}
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  firstName: string;
  lastName: string;
  phone?: string;
}