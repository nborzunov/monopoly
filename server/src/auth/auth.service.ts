import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { API_SOURCE } from 'src/constants/enums';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UsersService)) private usersService: UsersService, private jwtService: JwtService) { }
    
    async login(email: string, apiSource: API_SOURCE) {
        let candidate = await this.usersService.getUserByEmail(email, apiSource)

        if (!candidate) {
            candidate = await this.usersService.createUser(email, apiSource);
        }

        return {
            access_token: this.jwtService.sign({ email: candidate.email }),
        }
    }

    async validate(authToken: string) {
        let userData = this.jwtService.decode(authToken)


        if (typeof userData !== 'string' && userData.user) {
            let user = await this.usersService.getUserByEmail(userData.user.email, API_SOURCE.GOOGLE)

            return userData.user

            throw new HttpException('USER NOT AUTHENTICATED', HttpStatus.FORBIDDEN)
        }
    }

    decodeToken(authToken: string) {
        return this.jwtService.decode(authToken)
    }
}
