import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware
} from '@nestjs/common'
import {
  Request,
  Response,
  NextFunction
} from 'express'
import {
  AuthService
} from './auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.cookies.auth_token
    if (authToken) {
      const user = await this.authService.validate(authToken)

      req.user = user

      next()
    } else {
      next()
    }

  }
}