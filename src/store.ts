import { User, UserRole } from "@prisma/client";
import { create } from "zustand";

import { AppUser } from "./types";

type initialState = {
  language: string;
  user: AppUser | null;
  isAdmin: boolean;
  userRole: UserRole;
  hasSurvey: boolean;
  setCurrentLanguage: (language: string) => void;
  setUser: (user: AppUser) => void;
  setHasSurvey: (hasSurvey: boolean) => void;
  setRole: (userRole: UserRole) => void;
  setIsAdmin: (isAdmin: boolean) => void;
};

const useAppStore = create<initialState>((set) => ({
  language: "en",
  setCurrentLanguage: (language: string) =>
    set((state) => ({ ...state, language })),
  user: null,
  setUser: (user: AppUser) => set((state) => ({ ...state, user })),
  userRole: "User",
  isAdmin: false,
  hasSurvey: false,
  setHasSurvey: (hasSurvey: boolean) =>
    set((state) => ({ ...state, hasSurvey })),
  setRole: (userRole: UserRole) => set((state) => ({ ...state, userRole })),
  setIsAdmin: (isAdmin: boolean) => set((state) => ({ ...state, isAdmin })),
}));

/* const useFeedbackStore = create<initialState>((set) => ({
  page_loading: false,
  feedbacks: [],
  setPageLoading: (loading: boolean) =>
    set((state) => ({ ...state, page_loading: loading })),
  addFeedback: (feedback: Feedback) =>
    set((state) => ({
      ...state,
      feedbacks: [feedback, ...state.feedbacks],
    })),
  setFeedbackList: (feedbacks: Feedback[]) =>
    set((state) => ({ ...state, feedbacks })),
  deleteFeedback: (id: string) =>
    set((state) => ({
      ...state,
      feedbacks: state.feedbacks.filter((feedback) => feedback.id != id),
    })),
})); */

export default useAppStore;
