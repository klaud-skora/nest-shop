import { Controller, Get, Inject } from '@nestjs/common';
import { GetProductsListRes } from '../types/shop';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getProductsList(): GetProductsListRes {
    return this.shopService.getProductsList();
  }
}
