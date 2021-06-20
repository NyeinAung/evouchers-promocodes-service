import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PurchaseHistoriesModule } from '../purchase-histories/purchase-histories.module';

@Module({
  imports: [PurchaseHistoriesModule],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
