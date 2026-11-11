import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "../useCartStore";

describe("useCartStore - Shopping Cart Logic", () => {
  // Ghabl az har test, sabad ro reset mikonim ta test-ha rooye ham asar nazarand
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  const mockProduct = {
    id: "prod-1",
    slug: "lumina-75",
    name: "Lumina 75% Mechanical Keyboard",
    price: 8500000,
    coverImage: "/products/lumina.jpg",
    stock: 5,
  };

  const mockProduct2 = {
    id: "prod-2",
    slug: "gateron-oil-king",
    name: "Gateron Oil King Switches",
    price: 1950000,
    coverImage: "/products/switch.jpg",
    stock: 10,
  };

  it("should initialize with an empty cart", () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.getTotalItems()).toBe(0);
    expect(state.getTotalPrice()).toBe(0);
  });

  it("should add a new product to the cart", () => {
    useCartStore.getState().addItem(mockProduct, 1);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0]).toEqual({
      ...mockProduct,
      quantity: 1,
    });
    expect(state.getTotalItems()).toBe(1);
    expect(state.getTotalPrice()).toBe(8500000);
  });

  it("should increment quantity when adding an existing item", () => {
    useCartStore.getState().addItem(mockProduct, 1);
    useCartStore.getState().addItem(mockProduct, 2);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(3);
    expect(state.getTotalItems()).toBe(3);
    expect(state.getTotalPrice()).toBe(8500000 * 3);
  });

  it("should cap quantity to maximum available stock", () => {
    // Stock-e mockProduct barabar ba 5 ast
    useCartStore.getState().addItem(mockProduct, 10);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(5); // Bayad rooye 5 cap beshe
  });

  it("should update quantity directly", () => {
    useCartStore.getState().addItem(mockProduct, 1);
    useCartStore.getState().updateQuantity("prod-1", 4);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(4);
    expect(state.getTotalItems()).toBe(4);
  });

  it("should remove item when updated quantity is 0 or negative", () => {
    useCartStore.getState().addItem(mockProduct, 2);
    useCartStore.getState().updateQuantity("prod-1", 0);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
    expect(state.getTotalItems()).toBe(0);
  });

  it("should remove an item by id", () => {
    useCartStore.getState().addItem(mockProduct, 1);
    useCartStore.getState().addItem(mockProduct2, 1);

    expect(useCartStore.getState().items.length).toBe(2);

    useCartStore.getState().removeItem("prod-1");

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe("prod-2");
  });

  it("should accurately compute total items and total price across multiple products", () => {
    useCartStore.getState().addItem(mockProduct, 2); // 2 * 8,500,000 = 17,000,000
    useCartStore.getState().addItem(mockProduct2, 3); // 3 * 1,950,000 = 5,850,000

    const state = useCartStore.getState();
    expect(state.getTotalItems()).toBe(5);
    expect(state.getTotalPrice()).toBe(17000000 + 5850000);
  });

  it("should clear the entire cart", () => {
    useCartStore.getState().addItem(mockProduct, 1);
    useCartStore.getState().addItem(mockProduct2, 2);

    expect(useCartStore.getState().items.length).toBe(2);

    useCartStore.getState().clearCart();

    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.getTotalItems()).toBe(0);
    expect(state.getTotalPrice()).toBe(0);
  });
});
