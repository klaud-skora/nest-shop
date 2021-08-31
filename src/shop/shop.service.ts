import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { GetProductsListRes } from '../types/shop';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}
  getProductsList(): GetProductsListRes {
    return [
      {
        name: 'Shampoo',
        desc: 'For all kinds of hair',
        price: 23,
      },
      {
        name: 'Soap',
        desc: 'For all kinds of skin',
        price: 12,
      },
      {
        name: 'Gel',
        desc: 'For all kinds of skin',
        price: 3,
      },
    ];
  }
  hasProduct(name: string): boolean {
    return this.getProductsList().some((item) => item.name === name);
  }
  getItemPrice(name: string): number {
    return this.getProductsList().find((item) => item.name === name).price;
  }

  countPromo() {
    return this.basketService.getBasketTotalPrice() > 10 ? 1 : 0;
  }
}
