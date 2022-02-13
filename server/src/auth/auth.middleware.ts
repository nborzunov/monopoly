import type { NestMiddleware } from "@nestjs/common"
import { Injectable } from "@nestjs/common"
import type { Request, Response, NextFunction } from "express"
import type { AuthService } from "./auth.service"

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
