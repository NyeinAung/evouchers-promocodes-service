import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(authLoginDto: AuthLoginDto) {
        const user = await this.validateUser(authLoginDto);

        const payload = {
            userId: user.id,
        };

        return {
            statusCode: 200,
            access_token: this.jwtService.sign(payload, {expiresIn: "1d"}),
            refresh_token: jwt.sign(payload, process.env.refreshTokenSecretKey),
            user_id: user.id,
            auth: true
        };
    }

    async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
        const { email, password } = authLoginDto;

        const user = await this.usersService.findByEmail(email);
        if (!(await user?.validatePassword(password))) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
