import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEvoucherDto } from './dto/create-evoucher.dto';
import { UpdateEvoucherDto } from './dto/update-evoucher.dto';
import { EvouchersService } from './evouchers.service';

@UseGuards(JwtAuthGuard)
@Controller('evouchers')
export class EvouchersController {
  constructor(private readonly evouchersService: EvouchersService) {}

  @Get()
  getAllEvouchers() {
    return this.evouchersService.getAllEvouchers();
  }

  @Get(":id")
  getEvoucherDetails(@Param("id") id:number) {
    return this.evouchersService.findOne(id);
  }

  @Post("create")
  @UseInterceptors(FileInterceptor('image',
      {
        storage: diskStorage({
          destination: './evoucher_images', 
          filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            return cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      }
    )
  )
  create(@Body() createEvoucherDto:CreateEvoucherDto, @UploadedFile() file) {
    if(file) {
      createEvoucherDto.image = "auth/"+file.path;
    }

    return this.evouchersService.create(createEvoucherDto);
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor('image',
      {
        storage: diskStorage({
          destination: './evoucher_images', 
          filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            return cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      }
    )
  )
  update(@Param("id") id:number, @Body() updateEvoucherDto:UpdateEvoucherDto, @UploadedFile() file) {
    updateEvoucherDto.id = id;

    if(file) {
      updateEvoucherDto.image = "auth/"+file.path;
    }

    return this.evouchersService.update(updateEvoucherDto);
  }

  @Delete(':id')
  delete(@Param('id') id:number) {
    return this.evouchersService.delete(id)?{statusCode:200}:{StatusCode:422};
  }
}