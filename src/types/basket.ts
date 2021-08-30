export interface BasektItem {
  name: string;
  amount: number;
  id: string;
}

export type GetBasketRes = BasektItem[];
export type GetBasketTotalPriceRes = number | null;
