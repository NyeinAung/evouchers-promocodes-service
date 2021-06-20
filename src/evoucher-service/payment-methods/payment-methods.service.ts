import { Injectable } from '@nestjs/common';
import { PaymentMethods } from './payment-methods.entity';

@Injectable()
export class PaymentMethodsService {
    async getAllPaymentMethods(): Promise<PaymentMethods[]> {
        return await PaymentMethods.find();
    }
}
