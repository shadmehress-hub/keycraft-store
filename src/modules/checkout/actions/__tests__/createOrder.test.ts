import { describe, it, expect, vi } from "vitest";
import { createOrder } from "../createOrder";

describe("createOrder - Server Action Validation", () => {
  it("should reject order if customerName has less than 3 characters", async () => {
    const res = await createOrder(
      {
        customerName: "Al",
        phoneNumber: "09121234567",
        address: "Tehran, Valiasr St, No 12",
      },
      [{ productId: "1", name: "Keyboard", price: 1000, quantity: 1 }]
    );

    expect(res.success).toBe(false);
    expect(res.error).toContain("حداقل ۳ حرف");
  });

  it("should reject invalid Iranian phone numbers", async () => {
    const res = await createOrder(
      {
        customerName: "Parsa Sadeghi",
        phoneNumber: "12345", // Phone-e na-motabar
        address: "Tehran, Valiasr St, No 12",
      },
      [{ productId: "1", name: "Keyboard", price: 1000, quantity: 1 }]
    );

    expect(res.success).toBe(false);
    expect(res.error).toContain("شماره موبایل");
  });

  it("should reject if address is too short", async () => {
    const res = await createOrder(
      {
        customerName: "Parsa Sadeghi",
        phoneNumber: "09121234567",
        address: "Tehran", // Kamtar az 8 harf
      },
      [{ productId: "1", name: "Keyboard", price: 1000, quantity: 1 }]
    );

    expect(res.success).toBe(false);
    expect(res.error).toContain("آدرس پستی");
  });

  it("should reject if items array is empty", async () => {
    const res = await createOrder(
      {
        customerName: "Parsa Sadeghi",
        phoneNumber: "09121234567",
        address: "Tehran, Azadi St, Alley 4, Block 2",
      },
      [] // Sabade khali
    );

    expect(res.success).toBe(false);
    expect(res.error).toContain("سبد خرید شما خالی است");
  });
});
