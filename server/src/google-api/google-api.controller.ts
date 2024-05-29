import { Controller, Get, Query, Req, Res } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import axios from "axios"
import { Request, Response } from "express"
import { AuthService } from "src/auth/auth.service"
import { API_SOURCE } from "src/constants/enums"
import { GoogleApiService } from "./google-api.service"

@Controller("google")
export class GoogleApiController {
	constructor(
		private readonly googleApiService: GoogleApiService,
		private readonly jwtService: JwtService,
		private authService: AuthService,
	) {}

	@Get()
	async googleAuth(@Req() req: Request, @Res() res: Response, @Query("from") from) {
		const url = this.googleApiService.getGoogleAuthURL()

		res.cookie("from", from)
		res.status(200).send({
			url: url,
		})
	}

	@Get("redirect")
	async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
		const code = req.query.code

		const { id_token: idToken, access_token: accessToken } = await this.googleApiService.getTokens({
			code,
			clientId: process.env.OAUTH_CLIENT_ID,
			clientSecret: process.env.OAUTH_CLIENT_SECRET,
			redirectUri: `${process.env.BASE_URL}/google/redirect`,
		})

		const googleUser = await axios
			.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`, {
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			})
			.then((res) => res.data)
			.catch((error) => {
				console.error("Failed to fetch user")
				throw new Error(error.message)
			})

		this.authService.login(googleUser.email, API_SOURCE.GOOGLE)

		const token = this.jwtService.sign({
			user: googleUser,
		})

		res.cookie("auth_token", token, {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: false,
			secure: false,
		})

		res.redirect(req.cookies.from)
	}
}
