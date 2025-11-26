export interface AdminCategory {
  id: number;
  name: string;
  active: boolean;
  reason?: string;
  reactivateOn?: string;
}

export const adminCategories: AdminCategory[] = [
  { id: 1, name: "Alcohol", active: true },
  { id: 2, name: "Drinks", active: true },
  { id: 3, name: "Snacks", active: false, reason: "Supplier delay", reactivateOn: "2024-12-05" },
  { id: 4, name: "Groceries", active: true },
];
