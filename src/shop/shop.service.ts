import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { BasketService } from 'src/basket/basket.service';
import { getConnection, Like, Repository } from 'typeorm';
import {
  Product,
  GetPaginatedListOfProductsResponse,
  GetProductsListRes,
} from '../types/shop';
import { ShopItemProperties } from './shop-item-properties.entity';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService, // @InjectRepository(ShopItem) // private shopItemRepository: Repository<ShopItem>, => active record
  ) {}

  async getProductsList(
    currentPage = 1,
  ): Promise<GetPaginatedListOfProductsResponse> {
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
    // const count = await ShopItem.count();
    // console.log(count);
    // return await ShopItem.find({
    //   skip: 2,
    //   take: 2,
    // });

    const maxPerPage = 10;
    // const currentPage = 3;

    const [items, count] = await ShopItem.findAndCount({
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
      relations: ['properties'],
    });

    const totalPages = Math.ceil(count / maxPerPage);
    console.log(count);
    console.log('totalPages', totalPages);

    return { items, pages: totalPages, totalNumberOfItems: count };
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

    await newProduct.save();
    // await this.shopItemRepository.save(newProduct);
    // await ShopItem.save(newProduct);

    const properties = new ShopItemProperties();
    properties.color = 'green';
    properties.width = 20;

    await properties.save();

    newProduct.properties = properties;

    await newProduct.save();

    return newProduct;
  }

  async findProduct(searchTerm: string) {
    const { count } = await getConnection()
      .createQueryBuilder()
      .select('COUNT(shopItem.id)', 'count')
      .from(ShopItem, 'shopItem')
      .getRawOne();

    console.log(count);

    // return await ShopItem.find({
    //   where: {
    //     description: Like(`${searchTerm}`),
    //   },
    // });
    return await getConnection()
      .createQueryBuilder()
      .select('shopItem')
      .from(ShopItem, 'shopItem')
      .where('shopItem.desc LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .orderBy('shopItem.id', 'ASC')
      .addOrderBy('shopItem.name', 'ASC')
      .getMany();
  }

  async addBoughtCounter(id: string) {
    // this.shopItemRepository.update(id, { wasEverBought: true });
    ShopItem.update(id, { wasEverBought: true });

    // const product = await this.shopItemRepository.findOneOrFail(id);

    const product = await ShopItem.findOneOrFail(id);
    product.boughtCounter++;
    await product.save();
    return product;
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProductsList()).items.some(
      (item) => item.name === name,
    );
  }
  async getItemPrice(name: string): Promise<number> {
    return (await this.getProductsList()).items.find(
      (item) => item.name === name,
    ).price;
  }

  async countPromo() {
    return (await this.basketService.getBasketTotalPrice()) > 10 ? 1 : 0;
  }
}
