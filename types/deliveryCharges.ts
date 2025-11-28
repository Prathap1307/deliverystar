export interface DeliveryChargeRule {
  ruleId: string;
  milesStart: number;
  milesEnd: number;
  price: number;
  timeStart?: string;
  timeEnd?: string;
  active: boolean;
}
