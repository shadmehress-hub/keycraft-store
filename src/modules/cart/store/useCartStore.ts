import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartStore } from "../types";

/**
 * useCartStore - Global Shopping Cart Store
 *
 * Nokte 1: Az middleware-e `persist` estefade mikonim ta state khodkar tooye `localStorage`
 * zakhire beshe va ba Refresh kardan-e safhe dade-ha az beyn naran.
 *
 * Nokte 2: Har action asle Immutability (Jahesh-napaziri) ro re'ayat mikone va
 * hich vaght array ya object-e ghabli ro mutate nemikone.
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // State-e avvalie: sabad dar ebteda khaliye
      items: [],

      /**
       * addItem: Afzoodan-e mahsool be sabad
       * - Age mahsool ghablan tooye sabad bashe, faghat quantity-esh afzayesh peyda mikone.
       * - Math.min() jologiri mikone ke tedad az anbar (stock) bishtar beshe.
       */
      addItem: (product, quantity = 1) => {
        set((state) => {
          // 1. Check mikonim aya mahsool dar hale hazer tooye sabad hast ya na
          const existingItem = state.items.find((item) => item.id === product.id);

          if (existingItem) {
            // 2. Age bood: ba .map() yek array-e jadid misazim (Immutability)
            const updatedItems = state.items.map((item) => {
              if (item.id === product.id) {
                const newQuantity = Math.min(item.quantity + quantity, item.stock);
                return { ...item, quantity: newQuantity }; // Copy-e jadid az object
              }
              return item;
            });

            return { items: updatedItems };
          }

          // 3. Age ghablan nabood: yek aytem-e jadid be akhar-e array ezafe mikonim
          const newItem: CartItem = {
            ...product,
            quantity: Math.min(quantity, product.stock),
          };

          return { items: [...state.items, newItem] };
        });
      },

      /**
       * removeItem: Hazfe yek mahsool az sabad ba estefade az id
       * - .filter() yek array-e jadid bedoon-e aytem-e hazf-shode misaze.
       */
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      /**
       * updateQuantity: Taghire mostaghim-e tedad-e yek mahsool
       * - Age quantity sefr ya kamtar beshe, mahsool khodkar hazf mishe.
       * - Dar gheire in soorat, tedad ba re'ayate saqfe anbar (stock) update mishe.
       */
      updateQuantity: (id: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.id !== id),
            };
          }

          return {
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, quantity: Math.min(quantity, item.stock) }
                : item
            ),
          };
        });
      },

      /**
       * clearCart: Khali kardane kamele sabad
       */
      clearCart: () => {
        set({ items: [] });
      },

      /**
       * getTotalItems: Mohasebeye majmoo-e tedad-e kolle mahsoolat dar sabad
       * - Az get() estefade mikonim ta be state-e feli dastresi dashte bashim.
       */
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      /**
       * getTotalPrice: Mohasebeye gheymate kolle sabad (tedad * gheymat)
       */
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      // Name-e kelid dar localStorage-e مرورگر
      name: "keycraft-cart-storage",
    }
  )
);
