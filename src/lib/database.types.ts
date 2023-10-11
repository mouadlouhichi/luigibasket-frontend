export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Account: {
        Row: {
          access_token: string | null;
          expires_at: number | null;
          id: string;
          id_token: string | null;
          oauth_token: string | null;
          oauth_token_secret: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token: string | null;
          scope: string | null;
          session_state: string | null;
          token_type: string | null;
          type: string;
          userId: string;
        };
        Insert: {
          access_token?: string | null;
          expires_at?: number | null;
          id: string;
          id_token?: string | null;
          oauth_token?: string | null;
          oauth_token_secret?: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type: string;
          userId: string;
        };
        Update: {
          access_token?: string | null;
          expires_at?: number | null;
          id?: string;
          id_token?: string | null;
          oauth_token?: string | null;
          oauth_token_secret?: string | null;
          provider?: string;
          providerAccountId?: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Account_userId_fkey";
            columns: ["userId"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
        ];
      };
      Appointment: {
        Row: {
          clientId: string;
          id: string;
          sessionDate: string;
          status: Database["public"]["Enums"]["AppointmentStatus"];
          therapistId: string;
        };
        Insert: {
          clientId: string;
          id: string;
          sessionDate: string;
          status?: Database["public"]["Enums"]["AppointmentStatus"];
          therapistId: string;
        };
        Update: {
          clientId?: string;
          id?: string;
          sessionDate?: string;
          status?: Database["public"]["Enums"]["AppointmentStatus"];
          therapistId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Appointment_clientId_fkey";
            columns: ["clientId"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Appointment_therapistId_fkey";
            columns: ["therapistId"];
            referencedRelation: "Therapist";
            referencedColumns: ["id"];
          },
        ];
      };
      Availability: {
        Row: {
          days: string[] | null;
          hours: string;
          id: string;
          onlineSessions: boolean;
          therapistId: string;
        };
        Insert: {
          days?: string[] | null;
          hours: string;
          id: string;
          onlineSessions: boolean;
          therapistId: string;
        };
        Update: {
          days?: string[] | null;
          hours?: string;
          id?: string;
          onlineSessions?: boolean;
          therapistId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Availability_therapistId_fkey";
            columns: ["therapistId"];
            referencedRelation: "Therapist";
            referencedColumns: ["id"];
          },
        ];
      };
      Award: {
        Row: {
          awardDetails: string;
          awardingBody: string;
          date: string;
          id: string;
          therapistId: string;
        };
        Insert: {
          awardDetails: string;
          awardingBody: string;
          date: string;
          id: string;
          therapistId: string;
        };
        Update: {
          awardDetails?: string;
          awardingBody?: string;
          date?: string;
          id?: string;
          therapistId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Award_therapistId_fkey";
            columns: ["therapistId"];
            referencedRelation: "Therapist";
            referencedColumns: ["id"];
          },
        ];
      };
      Contact: {
        Row: {
          email: string;
          id: string;
          phone: string;
          therapistId: string;
          website: string;
        };
        Insert: {
          email: string;
          id: string;
          phone: string;
          therapistId: string;
          website: string;
        };
        Update: {
          email?: string;
          id?: string;
          phone?: string;
          therapistId?: string;
          website?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Contact_therapistId_fkey";
            columns: ["therapistId"];
            referencedRelation: "Therapist";
            referencedColumns: ["id"];
          },
        ];
      };
      Fee: {
        Row: {
          fee: string;
          id: string;
          service: string;
          therapistId: string;
        };
        Insert: {
          fee: string;
          id: string;
          service: string;
          therapistId: string;
        };
        Update: {
          fee?: string;
          id?: string;
          service?: string;
          therapistId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Fee_therapistId_fkey";
            columns: ["therapistId"];
            referencedRelation: "Therapist";
            referencedColumns: ["id"];
          },
        ];
      };
      Review: {
        Row: {
          id: string;
          rating: number;
          reviewText: string;
          therapistId: string;
        };
        Insert: {
          id: string;
          rating: number;
          reviewText: string;
          therapistId: string;
        };
        Update: {
          id?: string;
          rating?: number;
          reviewText?: string;
          therapistId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Review_therapistId_fkey";
            columns: ["therapistId"];
            referencedRelation: "Therapist";
            referencedColumns: ["id"];
          },
        ];
      };
      Session: {
        Row: {
          expires: string;
          id: string;
          sessionToken: string;
          userId: string;
        };
        Insert: {
          expires: string;
          id: string;
          sessionToken: string;
          userId: string;
        };
        Update: {
          expires?: string;
          id?: string;
          sessionToken?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Session_userId_fkey";
            columns: ["userId"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
        ];
      };
      Survey: {
        Row: {
          age: string;
          comfortWithTechnology: string;
          currentSymptoms: string;
          diagnosed: string;
          education: string;
          experiencedTrauma: string;
          foundTherapist: string[] | null;
          gender: string;
          id: string;
          notSeekingTherapyReasons: string[] | null;
          occupation: string;
          participatedOnline: string;
          preferredCommunicationMethod: string[] | null;
          primaryReason: string[] | null;
          receivedTherapy: string;
          receivedTreatment: string;
          struggledAddiction: string;
          suicidalThoughts: string;
          symptomsFrequency: string;
          userId: string;
        };
        Insert: {
          age: string;
          comfortWithTechnology: string;
          currentSymptoms: string;
          diagnosed: string;
          education: string;
          experiencedTrauma: string;
          foundTherapist?: string[] | null;
          gender: string;
          id: string;
          notSeekingTherapyReasons?: string[] | null;
          occupation: string;
          participatedOnline: string;
          preferredCommunicationMethod?: string[] | null;
          primaryReason?: string[] | null;
          receivedTherapy: string;
          receivedTreatment: string;
          struggledAddiction: string;
          suicidalThoughts: string;
          symptomsFrequency: string;
          userId: string;
        };
        Update: {
          age?: string;
          comfortWithTechnology?: string;
          currentSymptoms?: string;
          diagnosed?: string;
          education?: string;
          experiencedTrauma?: string;
          foundTherapist?: string[] | null;
          gender?: string;
          id?: string;
          notSeekingTherapyReasons?: string[] | null;
          occupation?: string;
          participatedOnline?: string;
          preferredCommunicationMethod?: string[] | null;
          primaryReason?: string[] | null;
          receivedTherapy?: string;
          receivedTreatment?: string;
          struggledAddiction?: string;
          suicidalThoughts?: string;
          symptomsFrequency?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Survey_userId_fkey";
            columns: ["userId"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
        ];
      };
      Therapist: {
        Row: {
          about: string;
          certifications: string[] | null;
          credentials: string;
          education: string;
          experienceYears: number;
          formation: string;
          id: string;
          languages: string[] | null;
          location: string;
          methods: string[] | null;
          professionalExperience: string;
          specialties: string[] | null;
          tools: string[] | null;
          userId: string;
        };
        Insert: {
          about: string;
          certifications?: string[] | null;
          credentials: string;
          education: string;
          experienceYears: number;
          formation: string;
          id: string;
          languages?: string[] | null;
          location: string;
          methods?: string[] | null;
          professionalExperience: string;
          specialties?: string[] | null;
          tools?: string[] | null;
          userId: string;
        };
        Update: {
          about?: string;
          certifications?: string[] | null;
          credentials?: string;
          education?: string;
          experienceYears?: number;
          formation?: string;
          id?: string;
          languages?: string[] | null;
          location?: string;
          methods?: string[] | null;
          professionalExperience?: string;
          specialties?: string[] | null;
          tools?: string[] | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Therapist_userId_fkey";
            columns: ["userId"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
        ];
      };
      User: {
        Row: {
          email: string | null;
          emailVerified: string | null;
          hasSurvey: boolean;
          id: string;
          image: string | null;
          name: string | null;
          password: string | null;
          userRole: Database["public"]["Enums"]["UserRole"];
        };
        Insert: {
          email?: string | null;
          emailVerified?: string | null;
          hasSurvey?: boolean;
          id: string;
          image?: string | null;
          name?: string | null;
          password?: string | null;
          userRole?: Database["public"]["Enums"]["UserRole"];
        };
        Update: {
          email?: string | null;
          emailVerified?: string | null;
          hasSurvey?: boolean;
          id?: string;
          image?: string | null;
          name?: string | null;
          password?: string | null;
          userRole?: Database["public"]["Enums"]["UserRole"];
        };
        Relationships: [];
      };
      VerificationToken: {
        Row: {
          expires: string;
          identifier: string;
          token: string;
        };
        Insert: {
          expires: string;
          identifier: string;
          token: string;
        };
        Update: {
          expires?: string;
          identifier?: string;
          token?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      AppointmentStatus: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELED";
      UserRole: "Owner" | "Admin" | "Therapist" | "User" | "Guest";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
