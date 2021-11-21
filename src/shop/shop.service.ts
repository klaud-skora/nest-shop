import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import { Repository } from 'typeorm';
import { GetProductsListRes, Product } from '../types/shop';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService, // @InjectRepository(ShopItem) // private shopItemRepository: Repository<ShopItem>, => active record
  ) {}

  async getProductsList(): Promise<GetProductsListRes> {
    // return [
    //   {
    //     name: 'Shampoo',
    //     desc: 'For all kinds of hair',
    //     price: 23,
    //   },
    //   {
    //     name: 'Soap',
    //     desc: 'For all kinds of skin',
    //     price: 12,
    //   },
    //   {
    //     name: 'Gel',
    //     desc: 'For all kinds of skin',
    //     price: 3,
    //   },
    // ];
    // return await this.shopItemRepository.find();
    return ShopItem.find();
  }

  async getOneProduct(id: string): Promise<Product> {
    // return this.shopItemRepository.findOneOrFail(id);
    return ShopItem.findOneOrFail(id);
  }

  async deleteOneProduct(id: string) {
    // return this.shopItemRepository.delete(id);
    return ShopItem.delete(id);
  }

  async createNewProduct() {
    const newProduct = new ShopItem();
    newProduct.name = 'ser';
    newProduct.price = 3.3;
    newProduct.desc = 'bardzo smaczny';

    // await this.shopItemRepository.save(newProduct);
    // await ShopItem.save(newProduct);
    await newProduct.save();
    return newProduct;
  }

  async addBoughtCounter(id: string) {
    // this.shopItemRepository.update(id, { wasEverBought: true });
    ShopItem.update(id, { wasEverBought: true });

    // const product = await this.shopItemRepository.findOneOrFail(id);

    const product = await ShopItem.findOneOrFail(id);
    product.boughtCounter++;
    await await product.save();
    return product;
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProductsList()).some((item) => item.name === name);
  }
  async getItemPrice(name: string): Promise<number> {
    return (await this.getProductsList()).find((item) => item.name === name)
      .price;
  }

  async countPromo() {
    return (await this.basketService.getBasketTotalPrice()) > 10 ? 1 : 0;
  }
}
