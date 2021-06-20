import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PurchaseHistory } from 'src/evoucher-service/purchase-histories/purchase-histories.entity';

@Injectable()
export class PromocodesService {

    async generatePromoCode(): Promise<any> {
        let promocode = Math.floor(100000 + Math.random() * 900000)+this.generateString(5);
        
        const oldPurchaseHistory = await PurchaseHistory.findOne({
            where: {
                promo_code: promocode,
            },
        });

        if(oldPurchaseHistory) {
            this.generatePromoCode();
        }

        return {statusCode: 200, "promo_code": promocode};
    }

    async checkPromoCode(code) {
        return await PurchaseHistory.findOne({
                    where: {
                        promo_code: code
                    }
                });
    }

    async generateQRCode():Promise<any> {
        // QRCode Generation
        var QRCode = require('qrcode')
        let qrcode = Math.floor(100000 + Math.random() * 900000)+this.generateString(5);

        const oldPurchaseHistory = await PurchaseHistory.findOne({
            where: {
                qrcode: qrcode,
            },
        });

        if(oldPurchaseHistory) {
            this.generateQRCode();
        }

        let qrcodepath = `qrcodes/${qrcode}.png`;
        QRCode.toFile(qrcodepath, qrcode, {
            type: "png",
            color: {
              dark: '#000',  // Blue dots
              light: '#fff' // Transparent background
            }
        }, function (err) {
            if (err) {statusCode:422}
        })

        return {statusCode:200, qrcode: qrcode, qrcode_image: `${process.env.BASE_URL}auth/${qrcodepath}`}
    }

    generateString(length) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    }
}
