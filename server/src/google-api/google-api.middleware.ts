import { NestMiddleware } from "@nestjs/common"
import { Injectable } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"
import { AuthService } from "src/auth/auth.service"

@Injectable()
export class GoogleApiMiddleware implements NestMiddleware {
	constructor(private authService: AuthService) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const authToken = req.cookies.auth_token

		const data = this.authService.decodeToken(authToken)

		if (typeof data !== "string") {
			req.user = data?.user
		}

		next()
	}
}
