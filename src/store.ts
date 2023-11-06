import { Basket, BasketItem, Product, User, UserRole } from "@prisma/client";
import { create } from "zustand";

import { AppUser } from "./types";

type BasketItemAttr = keyof BasketItem;
type BasketItemValue = BasketItem[BasketItemAttr];

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
  cart: Basket & { basketItems: BasketItem[] };
  basketItem: BasketItem;
  setBasketItem: (basketItem: BasketItem) => void;
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

  cart: {} as Basket & { basketItems: BasketItem[] },
  basketItem: {} as BasketItem,
  setBasketItem: (basketItem: BasketItem) =>
    set((state) => ({ ...state, basketItem })),

  addBasketItem: (basketItem: BasketItem, userId: string) =>
    set((state) => {
      const existingItemIndex = state.cart.basketItems.findIndex(
        (cartItem) => cartItem.id === basketItem.id,
      );
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity or other properties
        const updatedItems = [...state.cart.basketItems];
        const tempItem = updatedItems[existingItemIndex];
        if (tempItem) {
          updatedItems[existingItemIndex] = {
            ...tempItem,
            quantity: tempItem.quantity + basketItem.quantity,
          };
        }

        return { ...state, cart: { ...state.cart, basketItems: updatedItems } };
      } else {
        // If the item is not in the cart, add it
        return {
          ...state,
          cart: {
            ...state.cart,
            userId,
            basketItems: [...state.cart.basketItems, basketItem],
          },
        };
      }
    }),

  removeBasketItem: (basketItem: BasketItem) =>
    set((state) => {
      const existingItemIndex = state.cart.basketItems.findIndex(
        (cartItem) => cartItem.id === basketItem.id,
      );
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, remove the item
        const updatedItems = [...state.cart.basketItems];
        updatedItems.map((item) => item.id !== basketItem.id);

        return { ...state, cart: { ...state.cart, basketItems: updatedItems } };
      } else {
        // If the item is not in the cart, add it
        return state;
      }
    }),

  updateBasetItem: (
    basketItemId: number,
    field: BasketItemAttr,
    value: BasketItemValue,
  ) =>
    set((state) => {
      const existingItemIndex = state.cart.basketItems.findIndex(
        (cartItem) => cartItem.id === basketItemId,
      );
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity or other properties
        const updatedItems = [...state.cart.basketItems];
        const tempItem = updatedItems[existingItemIndex];
        if (tempItem) {
          updatedItems[existingItemIndex] = {
            ...tempItem,
            [field]: value,
          };
        }

        return { ...state, cart: { ...state.cart, basketItems: updatedItems } };
      } else {
        // If the item is not in the cart, add it
        return state;
      }
    }),
}));

/*



addItem: (item) => set((state) => {
      const existingItemIndex = state.items.findIndex((cartItem) => cartItem.id === item.id);

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity or other properties
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], quantity: updatedItems[existingItemIndex].quantity + 1 };

        return { state: { ...state, items: updatedItems } };
      } else {
        // If the item is not in the cart, add it
        return { state: { ...state, items: [...state.items, item] } };
      }
    }),

      if(state.cart.basketItems.find((item) => item.productId === basketItem.productId)){

{
      ...state,
      cart: {
        ...state.cart,
        userId,
        basketItems: [...state.cart.basketItems, basketItem],
      },
    }

const useFeedbackStore = create<initialState>((set) => ({
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
