import { Controller, Get, HttpException, HttpStatus, Req, Res } from "@nestjs/common"
import { Request, Response } from "express"
import { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get()
	async validate(@Req() req: Request, @Res() res: Response) {
		const authToken = req.cookies.auth_token
		if (authToken) {
			const user = await this.authService.validate(authToken)

			res.send(user)
		} else {
			throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)
		}
	}
}
