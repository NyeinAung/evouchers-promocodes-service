import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {

    async create(createUserDto: CreateUserDto) {
        const user = User.create(createUserDto);
        await user.save();
    
        delete user.password;
        return user;
    }

    async findByEmail(email: string) {
        return await User.findOne({
            where: {
                email: email,
            },
        });
    }

    async getUserIdByToken(authorization): Promise<any> {
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (!err) {
                // confirm identity and check user permissions
                return payload.userId;
            } else {
                return false;
            }
        });
    }
}
