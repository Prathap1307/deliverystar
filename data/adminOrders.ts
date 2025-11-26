export interface AdminOrder {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  items: string;
  price: number;
  deliveryPrice: number;
  surcharge: number;
  location: string;
  instorePickup: boolean;
  status: "Preparing" | "Prepared" | "On The Way" | "Delivered" | "Rider Arrived" | "Rider Picked";
}

export const todaysOrders: AdminOrder[] = [
  {
    id: "ORD123",
    customerName: "John Doe",
    phone: "1234567890",
    email: "john@example.com",
    items: "Vodka x1, Chips x2",
    price: 45.99,
    deliveryPrice: 4.99,
    surcharge: 1.5,
    location: "123 Luton Road",
    instorePickup: true,
    status: "Preparing",
  },
  {
    id: "ORD124",
    customerName: "Priya K.",
    phone: "9876543210",
    email: "priya@example.com",
    items: "Coke x3, Brownie x2",
    price: 24.5,
    deliveryPrice: 3.99,
    surcharge: 0,
    location: "45 Baker Street",
    instorePickup: false,
    status: "On The Way",
  },
];

export const allOrders: AdminOrder[] = [
  ...todaysOrders,
  {
    id: "ORD125",
    customerName: "Alex Morgan",
    phone: "4455667788",
    email: "alex@example.com",
    items: "Tequila x1, Lime x6",
    price: 52.0,
    deliveryPrice: 6.5,
    surcharge: 2.0,
    location: "88 Riverside Ave",
    instorePickup: false,
    status: "Delivered",
  },
  {
    id: "ORD126",
    customerName: "Fatima S.",
    phone: "1122334455",
    email: "fatima@example.com",
    items: "Red Wine x2",
    price: 38.0,
    deliveryPrice: 5.5,
    surcharge: 1.0,
    location: "22 High Street",
    instorePickup: true,
    status: "Prepared",
  },
];
