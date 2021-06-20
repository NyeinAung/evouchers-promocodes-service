export class CreateEvoucherDto {
  user_id: number;
  title: string;
  description: string;
  expiry_date: Date;
  image: string;
  amount: number;
  quantity: number;
  payment_method: number;
  buy_type: number;
  name: string;
  phone_no: string;
  maxium_gift_limit: number;
  maximum_limit: number;
  is_active: number;
}