import { uuid } from 'uuidv4';
import { Inject, Injectable } from '@nestjs/common';
import {
  BasektItem,
  GetBasketTotalPriceRes,
  GetBasketRes,
} from '../types/basket';
import { ShopService } from '../shop/shop.service';

export type AddToBasketRes =
  | {
      success: true;
      id?: string;
    }
  | {
      success: false;
    };

export interface DeleteFromBasektRes {
  success: boolean;
}

@Injectable()
export class BasketService {
  private userBasket: BasektItem[] = [];
  constructor(
    @Inject(ShopService)
    private shopService: ShopService,
  ) {}
  getBasket(): GetBasketRes {
    return this.userBasket;
  }
  getBasketTotalPrice(): GetBasketTotalPriceRes {
    let totalPrice = 0;
    this.getBasket().forEach((item) => {
      if (this.shopService.hasProduct(item.name))
        totalPrice += this.shopService.getItemPrice(item.name) * item.amount;
    });
    if (totalPrice) return totalPrice;
    else return null;
  }

  addToBasket({ name, amount }): AddToBasketRes {
    if (
      name &&
      amount &&
      amount > 0 &&
      this.shopService
        .getProductsList()
        .find((product) => product.name === name)
    ) {
      const id = uuid();
      this.userBasket.push({ name, amount, id });
      console.log('User basket state after adding item: ', this.userBasket);
      return { success: true, id };
    } else return { success: false };
  }

  deleteFromBasket(id: string): DeleteFromBasektRes {
    const itemToDelete = this.userBasket.find((product) => product.id === id);
    if (itemToDelete) {
      this.userBasket = this.userBasket.filter((product) => product.id !== id);
      console.log('User basket state after deleting item: ', this.userBasket);
      return { success: true };
    } else return { success: false };
  }
}
