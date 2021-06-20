import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateEvoucherDto } from './dto/create-evoucher.dto';
import { UpdateEvoucherDto } from './dto/update-evoucher.dto';
import { Evoucher } from './evoucher.entity';

@Injectable()
export class EvouchersService {

    async getAllEvouchers(): Promise<Evoucher[]> {
        return await Evoucher.find();
    }

    async findOne(id:number): Promise<Evoucher> {
        return await Evoucher.findOne(id);
    }
    
    async create(createEvoucherDto: CreateEvoucherDto) {
        const data = Evoucher.create(createEvoucherDto);
        await data.save();
    
        return data;
    }

    async update(updateEvoucherDto: UpdateEvoucherDto): Promise<Evoucher> {
        const data = await Evoucher.findOne(updateEvoucherDto.id);
        if (!data) {
            throw new NotFoundException('Evoucher is not found!');
        }

        data.title = updateEvoucherDto.title;
        data.description = updateEvoucherDto.description;
        data.expiry_date = updateEvoucherDto.expiry_date;
        data.image = updateEvoucherDto.image;
        data.amount = updateEvoucherDto.amount;
        data.quantity = updateEvoucherDto.quantity;
        data.payment_method = updateEvoucherDto.payment_method;
        data.buy_type = updateEvoucherDto.buy_type;
        data.name = updateEvoucherDto.name;
        data.phone_no = updateEvoucherDto.phone_no;
        data.maximum_gift_limit = updateEvoucherDto.maximum_gift_limit;
        data.maximum_limit = updateEvoucherDto.maximum_limit;
        data.is_active = updateEvoucherDto.is_active;
        await data.save();
        
        return data;
    }

    async delete(id: number) {
        if(Evoucher.delete(id)) {
            return true;
        }

        return false;
    }
}
