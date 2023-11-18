import { Basket, BasketItem, Product, User, UserRole } from "@prisma/client";
import { get } from "lodash";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AppUser } from "./types";

type BasketItemAttr = keyof BasketItem;
type BasketItemValue = BasketItem[BasketItemAttr];

type BasketItemObject = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
  name: string;
  description?: string;
  image: string;
  category: string;
};

type BasketObject = {
  id: string;
  basketItems: BasketItemObject[];
  userId: string;
};

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
  //cart functions
  cart: BasketObject;
  addBasketItem: (basketItem: BasketItemObject, userId: string) => void;
  removeBasketItem: (basketItem: BasketItemObject) => void;
  getBasketCount: () => number;
  updateBasetItem: (
    basketItemId: string,
    field: BasketItemAttr,
    value: BasketItemValue,
  ) => void;
};

const useAppStore = create<initialState>()(
  persist(
    (set, get) => ({
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

      cart: {} as BasketObject,
      basketItem: {} as BasketItemObject,

      addBasketItem: (basketItem: BasketItemObject, userId: string) =>
        set((state) => {
          if (!state.cart.basketItems) {
            return {
              ...state,
              cart: {
                ...state.cart,
                userId,
                basketItems: [basketItem],
              },
            };
          }
          const existingItemIndex = state.cart.basketItems?.findIndex(
            (cartItem) => cartItem.productId === basketItem.productId,
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

            return {
              ...state,
              cart: { ...state.cart, basketItems: updatedItems },
            };
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

      removeBasketItem: (basketItem: BasketItemObject) =>
        set((state) => {
          const existingItemIndex = state.cart.basketItems.findIndex(
            (cartItem) => cartItem.id === basketItem.id,
          );
          if (existingItemIndex !== -1) {
            // If the item already exists in the cart, remove the item
            const updatedItems = [...state.cart.basketItems];
            updatedItems.map((item) => item.id !== basketItem.id);

            return {
              ...state,
              cart: { ...state.cart, basketItems: updatedItems },
            };
          } else {
            // If the item is not in the cart, add it
            return state;
          }
        }),

      updateBasetItem: (
        basketItemId: string,
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

            return {
              ...state,
              cart: { ...state.cart, basketItems: updatedItems },
            };
          } else {
            // If the item is not in the cart, add it
            return state;
          }
        }),
      getBasketCount: () => {
        const basketItems = get().cart.basketItems;
        return basketItems?.length || 0;
      },
    }),
    {
      name: "cart", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
    },
  ),
);

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
