export type ShopProduct = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  inStock: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CheckoutRequest = {
  items: CartItem[];
  customerEmail: string;
};

export type CheckoutResponse = {
  checkoutUrl: string;
  orderId: string;
};
