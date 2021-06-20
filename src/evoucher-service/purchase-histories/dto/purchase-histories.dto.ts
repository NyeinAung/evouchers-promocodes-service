export class CreatePurchaseHistoryDto {
  evoucher_id: number;
  qrcode: string;
  qrcode_image: string;
  promo_code: string;
  is_active: activeStatus;
}

export enum activeStatus {
  ACTIVE = 1,
  INACTIVE = 0
}