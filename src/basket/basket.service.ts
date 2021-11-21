import { uuid } from 'uuidv4';
import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import {
  BasektItem,
  GetBasketTotalPriceRes,
  GetBasketRes,
} from '../types/basket';
import { ShopService } from '../shop/shop.service';
import { AddToBasketDto } from './dto/addToBasket.dto';

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

@Injectable({
  scope: Scope.REQUEST,
})
export class BasketService {
  private userBasket: BasektItem[] = [];
  constructor(
    @Inject(forwardRef(() => ShopService))
    private shopService: ShopService,
  ) {}
  getBasket(): GetBasketRes {
    return this.userBasket;
  }
  async getBasketTotalPrice(): Promise<GetBasketTotalPriceRes> {
    if (
      !this.userBasket.every((item) => this.shopService.hasProduct(item.name))
    ) {
      const alternativeBasket = this.getBasket().filter((item) =>
        this.shopService.hasProduct(item.name),
      );

      return {
        isSuccess: false,
        alternativeBasket,
      };
    }

    // return (
    //   (await Promise.all(
    //     this.userBasket.map(
    //       async (item) => (await this.shopService.getItemPrice(item.name)) *
    //         item.amount *
    //         1.23
    //     )))
    //   )
    // ).reduce((prev, curr) => prev + curr, 0);
    // )
  }

  async addToBasket({
    name,
    amount,
    id,
  }: AddToBasketDto): Promise<AddToBasketRes> {
    if (
      name &&
      amount &&
      amount > 0 &&
      (await this.shopService.getProductsList()).find(
        (product) => product.name === name,
      )
    ) {
      // const id = uuid();
      this.userBasket.push({ name, amount, id });
      this.shopService.addBoughtCounter(id);

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
