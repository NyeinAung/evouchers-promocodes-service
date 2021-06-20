import { Module } from '@nestjs/common';
import { EvouchersService } from './evouchers.service';
import { EvouchersController } from './evouchers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evoucher } from './evoucher.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evoucher]),
    UsersModule
  ],
  controllers: [EvouchersController],
  providers: [EvouchersService]
})
export class EvouchersModule {}
