import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Scope,
} from '@nestjs/common';
import {
  GetProductsListRes,
  GetOneProductRes,
  CreatedNewProduct,
} from '../types/shop';
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
  getProductsList(): Promise<GetProductsListRes> {
    return this.shopService.getProductsList();
  }

  @Get('/:id')
  getOneProduct(@Param('id') id: string): Promise<GetOneProductRes> {
    // const product = this.shopService.getOneProduct(id);
    // if (!product) throw new Error('Product not found');
    // return product;
    return this.shopService.getOneProduct(id);
  }

  @Delete('/:id')
  deleteOneProduct(@Param('id') id: string) {
    return this.shopService.deleteOneProduct(id);
  }

  @Post('/')
  createNewProduct(): Promise<CreatedNewProduct> {
    return this.shopService.createNewProduct();
  }
}
