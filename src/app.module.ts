import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';

// eVoucher Management Service
import { Evoucher } from './evoucher-service/evouchers/evoucher.entity';
import { Payments } from './evoucher-service/payments/payments.entity';
import { PurchaseHistory } from './evoucher-service/purchase-histories/purchase-histories.entity';
import { PaymentMethods } from './evoucher-service/payment-methods/payment-methods.entity';
import { EvouchersModule } from './evoucher-service/evouchers/evouchers.module';
import { PaymentMethodsModule } from './evoucher-service/payment-methods/payment-methods.module';
import { PaymentsModule } from './evoucher-service/payments/payments.module';
import { PurchaseHistoriesModule } from './evoucher-service/purchase-histories/purchase-histories.module';

// Promocode Management Service
import { PromocodesModule } from './promocodes-service/promocodes/promocodes.module';

const entities = [User, Evoucher, PaymentMethods, Payments, PurchaseHistory];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    EvouchersModule,
    PaymentMethodsModule,
    PaymentsModule,
    PurchaseHistoriesModule,
    PromocodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
