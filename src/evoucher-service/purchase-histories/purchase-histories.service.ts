import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PromocodesService } from 'src/promocodes-service/promocodes/promocodes.service';
import { CreatePurchaseHistoryDto, activeStatus } from './dto/purchase-histories.dto';
import { PurchaseHistory } from './purchase-histories.entity';

@Injectable()
export class PurchaseHistoriesService {
    constructor(private promocodesService: PromocodesService) {}

    async getAllHistories(evoucher_id: number) {
        let unused,used = [];
        const unusedPurchases = await PurchaseHistory.find({
                                where: {
                                    evoucher_id,
                                    is_active: activeStatus.ACTIVE
                                }
                            });
                            
        const usedPurchases = await PurchaseHistory.find({
                                where: {
                                    evoucher_id,
                                    is_active: activeStatus.INACTIVE
                                }
                            });

        unused = unusedPurchases;
        used = usedPurchases;
        return {"unused": unused, 
                "used": used};
    }

    async create(evoucherid: number, quantity: number) {
        for(let i=1; i <= quantity; i++) {
            const createPurchaseHistoryDto = new CreatePurchaseHistoryDto;
            createPurchaseHistoryDto.evoucher_id = evoucherid;
            createPurchaseHistoryDto.qrcode_image = "testing";

            const promocodeResult = await this.promocodesService.generatePromoCode();
            if(promocodeResult.statusCode == 200) {
                createPurchaseHistoryDto.promo_code = promocodeResult.promo_code;
            }

            const qrcodeResult = await this.promocodesService.generateQRCode();
            if(qrcodeResult.statusCode == 200) {
                createPurchaseHistoryDto.qrcode = qrcodeResult.qrcode;
                createPurchaseHistoryDto.qrcode_image = qrcodeResult.qrcode_image;
            }

            createPurchaseHistoryDto.is_active = 1;

            const data = PurchaseHistory.create(createPurchaseHistoryDto);
            await data.save();
        }
    
        return true;
    }

    async verifyPromoCode(code: string) {
        const data = await this.promocodesService.checkPromoCode(code);

        if (!data) {
            throw new NotFoundException('Promocode is not found!');
        }

        if(data.is_active == activeStatus.INACTIVE) {
            return {statusCode: 400, message: "Already Verified!"};
        }

        data.is_active = activeStatus.INACTIVE;
        await data.save();

        return {statusCode: 200};
    }
}
