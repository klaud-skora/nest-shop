import { Controller, Get, Inject, Scope } from '@nestjs/common';
import { GetProductsListRes } from '../types/shop';
import { ShopService } from './shop.service';

@Controller({
  path: 'shop',
  // host: ':name.lvl.me',
  scope: Scope.REQUEST,
})
export class ShopController {
  onApplicationBootstrap() {
    console.log('Załadowany');
  }

  onApplicationShutdown() {
    console.log('Zamykamy apkę');
  }
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getProductsList(): GetProductsListRes {
    return this.shopService.getProductsList();
  }
}
