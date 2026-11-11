export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  coverImage: string;
  quantity: number;
  stock: number;
}

export interface CartStore {
  // State
  items: CartItem[];

  // Actions
  addItem: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  // Computed / Getters
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
