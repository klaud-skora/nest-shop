import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    forwardRef(() => BasketModule),
    forwardRef(() => ShopModule),
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
