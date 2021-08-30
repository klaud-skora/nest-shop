import { Injectable } from '@nestjs/common';
import { GetProductsListRes } from '../types/shop';

@Injectable()
export class ShopService {
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
}
