import { Injectable } from '@nestjs/common';
import { Evoucher } from '../evouchers/evoucher.entity';
import { PurchaseHistoriesService } from '../purchase-histories/purchase-histories.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payments } from './payments.entity';

@Injectable()
export class PaymentsService {
    constructor(private purchaseHistoriesService: PurchaseHistoriesService) {}

    async create(createPaymentDto: CreatePaymentDto) {
        const data = Payments.create(createPaymentDto);
        await data.save();
        
        if(data) {
            const evoucher = await Evoucher.findOne(data.evoucher_id);
            await this.purchaseHistoriesService.create(evoucher.id, evoucher.quantity);

            return {statusCode: 200};
        }

        return {statusCode: 400};
    }
}
