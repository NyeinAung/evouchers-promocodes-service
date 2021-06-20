import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PurchaseHistoriesService } from './purchase-histories.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('purchase-histories')
export class PurchaseHistoriesController {
  constructor(private readonly purchaseHistoriesService: PurchaseHistoriesService) {}

  @Get(":evoucherid")
  getAllHistories(@Param("evoucherid") evoucher_id:number) {
    return this.purchaseHistoriesService.getAllHistories(evoucher_id); 
  }

  @Post(":evoucherid/create")
  @UseInterceptors(FileInterceptor(""))
  create(@Param("evoucherid") evoucher_id:number, @Body() body) {
    return this.purchaseHistoriesService.create(evoucher_id, body.quantity)?{statusCode:200}:{statusCode:400};
  }

  @Post("verify/:code")
  verifyPromoCode(@Param("code") code:string) {
    return this.purchaseHistoriesService.verifyPromoCode(code);
  }
}
