export type AdminOrderStatus =
  | "pending"
  | "accepted_by_restaurant"
  | "delivery_boy_reached"
  | "restaurant_prepared"
  | "delivery_boy_picked_up"
  | "on_the_way"
  | "delivery_boy_arrived"
  | "order_delivered";

export interface AdminOrderItem {
  id?: string;
  name: string;
  qty: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  restaurantName: string;
  instorePickup: boolean;
  pickupLocation?: string;
  deliveryLocation?: string;
  items: AdminOrderItem[];
  deliveryCharge: number;
  tax: number;
  surcharge: number;
  status: AdminOrderStatus;
  createdAt?: string;
}

export const STATUS_OPTIONS: { value: AdminOrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "accepted_by_restaurant", label: "Accepted by Restaurant" },
  { value: "delivery_boy_reached", label: "Delivery Boy Reached" },
  { value: "restaurant_prepared", label: "Restaurant Prepared" },
  { value: "delivery_boy_picked_up", label: "Delivery Boy Picked Up" },
  { value: "on_the_way", label: "On The Way" },
  { value: "delivery_boy_arrived", label: "Delivery Boy Reached" },
  { value: "order_delivered", label: "Order Delivered" },
];

const statusLabelMap = new Map(STATUS_OPTIONS.map((entry) => [entry.value, entry.label]));

export function getStatusLabel(status: AdminOrderStatus | string) {
  return statusLabelMap.get(status as AdminOrderStatus) ?? status;
}
