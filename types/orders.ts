export type OrderStatus =
  | "pending"
  | "accepted"
  | "restaurant-preparing"
  | "delivery-boy-reached"
  | "prepared"
  | "picked-up"
  | "on-the-way"
  | "delivery-boy-arrived"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  name: string;
  quantity?: number;
  price?: number;
  notes?: string;
}

export interface Order {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  restaurantName: string;
  instorePickup: boolean;
  pickupLocation: string;
  dropLocation: string;
  items: OrderItem[];
  orderTotal: number;
  deliveryCharge: number;
  surcharge: number;
  tax: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
