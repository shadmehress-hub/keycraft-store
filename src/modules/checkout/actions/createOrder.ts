"use server";

import { prisma } from "@/lib/prisma";
import type { CheckoutFormData, CheckoutItemPayload, CreateOrderResult } from "../types";

/**
 * Server Action: Sabte Sefaresh va Simulasione Pardakht
 * Tamami gheymat-ha va mojoodi dar samt-e Server az DB verify mishan.
 */
export async function createOrder(
  data: CheckoutFormData,
  items: CheckoutItemPayload[]
): Promise<CreateOrderResult> {
  try {
    // 1. Validation-e form
    if (!data.customerName || data.customerName.trim().length < 3) {
      return { success: false, error: "نام و نام خانوادگی باید حداقل ۳ حرف باشد." };
    }

    const cleanPhone = data.phoneNumber?.trim().replace(/\s+/g, "");
    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      return { success: false, error: "شماره موبایل وارد شده معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)." };
    }

    if (!data.address || data.address.trim().length < 8) {
      return { success: false, error: "آدرس پستی دقیق جهت ارسال کالا الزامی است." };
    }

    if (!items || items.length === 0) {
      return { success: false, error: "سبد خرید شما خالی است." };
    }

    // 2. Security Check: Estelame gheymat va mojoodi az DB (Etemad nakardan be gheymate Client)
    const productIds = items.map((i) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (dbProducts.length !== productIds.length) {
      return { success: false, error: "برخی از کالاهای انتخابی در پایگاه داده یافت نشدند." };
    }

    // 3. Barresi-ye Mojoodi va mohasebeye gheymate nahayi az rooye DB
    let verifiedTotal = 0;
    const orderItemsData: Array<{
      productId: string;
      name: string;
      price: number;
      quantity: number;
    }> = [];

    for (const item of items) {
      const dbProd = dbProducts.find((p) => p.id === item.productId);
      if (!dbProd) {
        return { success: false, error: `محصول ${item.name} یافت نشد.` };
      }

      if (dbProd.stock < item.quantity) {
        return {
          success: false,
          error: `موجودی ${dbProd.name} کافی نیست (موجودی فعلی: ${dbProd.stock} عدد).`,
        };
      }

      verifiedTotal += dbProd.price * item.quantity;
      orderItemsData.push({
        productId: dbProd.id,
        name: dbProd.name,
        price: dbProd.price, // Gheymate vaghei az DB
        quantity: item.quantity,
      });
    }

    // 4. Tolide Shomare Sefaresh-e monhaser-be-fard (mesle KC-2694182)
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `KC-${randomDigits}`;

    // 5. Transaction-e atomic dar PostgreSQL ba Prisma
    await prisma.$transaction(async (tx) => {
      // A) Create Order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName: data.customerName.trim(),
          phoneNumber: cleanPhone,
          address: data.address.trim(),
          postalCode: data.postalCode?.trim() || null,
          note: data.note?.trim() || null,
          totalPrice: verifiedTotal,
          status: "PAID",
          items: {
            create: orderItemsData,
          },
        },
      });

      // B) Kasre mojoodi az mahsoolat
      for (const item of orderItemsData) {
        const updated = await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
          },
        });

        // Agar mojoodi sefr shod, inStock = false
        if (updated.stock <= 0) {
          await tx.product.update({
            where: { id: item.productId },
            data: { inStock: false },
          });
        }
      }

      return newOrder;
    });

    return {
      success: true,
      orderNumber,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: "خطایی در ثبت سفارش رخ داد. لطفا مجددا تلاش کنید.",
    };
  }
}
