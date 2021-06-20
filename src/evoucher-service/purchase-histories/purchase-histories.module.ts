import { Module } from '@nestjs/common';
import { PurchaseHistoriesService } from './purchase-histories.service';
import { PurchaseHistoriesController } from './purchase-histories.controller';
import { PromocodesModule } from 'src/promocodes-service/promocodes/promocodes.module';

@Module({
  imports: [PromocodesModule],
  controllers: [PurchaseHistoriesController],
  providers: [PurchaseHistoriesService],
  exports: [PurchaseHistoriesService]
})
export class PurchaseHistoriesModule {}
