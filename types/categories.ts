import { Schedule } from "./schedule";

export interface Category {
  categoryId: string;
  name: string;
  active: boolean;
  schedule?: Schedule;
}
