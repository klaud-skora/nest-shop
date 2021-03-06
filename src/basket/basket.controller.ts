import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { GetBasketRes, GetBasketTotalPriceRes } from '../types/basket';
import {
  AddToBasketRes,
  BasketService,
  DeleteFromBasektRes,
} from './basket.service';
import { AddToBasketDto } from './dto/addToBasket.dto';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Get('/')
  getBasket(): GetBasketRes {
    return this.basketService.getBasket();
  }
  @Get('/total-price')
  getBasketTotalPrice(): Promise<GetBasketTotalPriceRes> {
    return this.basketService.getBasketTotalPrice();
  }

  @Post('/')
  addToBasket(
    @Body() { name, amount, id }: AddToBasketDto,
  ): Promise<AddToBasketRes> {
    return this.basketService.addToBasket({ name, amount, id });
  }

  @Delete('/:id')
  deleteFromBasket(@Param('id') id: string): DeleteFromBasektRes {
    return this.basketService.deleteFromBasket(id);
  }
}
