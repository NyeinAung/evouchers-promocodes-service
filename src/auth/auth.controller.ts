import { Controller, Body, Get, Post, UseGuards, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Already Logged In!';
  }

  @Get('evoucher_images/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'evoucher_images'});
  }

  @Get('qrcodes/:fileId')
  async serveQrCodeImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'qrcodes'});
  }
}
