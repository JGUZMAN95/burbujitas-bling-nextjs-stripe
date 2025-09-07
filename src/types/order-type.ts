// src/types/order.ts
// Define the Order type to represent order data structure.
export type Order = {
  name: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  lineItems: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  shippingCost: number;
  status: "placed" | "shipped";
  trackingUrl?: string;
  estimatedDelivery?: string;
  createdAt: string; // ISO date string
  shippedAt?: string; // ISO date string
};
