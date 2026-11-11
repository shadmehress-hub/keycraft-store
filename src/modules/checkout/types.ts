export interface CheckoutFormData {
  customerName: string;
  phoneNumber: string;
  address: string;
  postalCode?: string;
  note?: string;
}

export interface CheckoutItemPayload {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateOrderResult {
  success: boolean;
  orderNumber?: string;
  error?: string;
}
