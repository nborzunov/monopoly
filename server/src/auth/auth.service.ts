import { forwardRef, Inject, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { API_SOURCE } from "src/constants/enums"
import { UsersService } from "src/users/users.service"

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UsersService)) private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async login(email: string, apiSource: API_SOURCE) {
		let candidate = await this.usersService.getUserByEmail(email, apiSource)

		if (!candidate) {
			candidate = await this.usersService.createUser(email, apiSource)
		}

		return {
			access_token: this.jwtService.sign({ email: candidate.email }),
		}
	}

	async validate(authToken: string) {
		const userData = this.jwtService.decode(authToken)

		if (!authToken) {
			return null
		}

		if (typeof userData !== "string" && userData.user) {
			// const user = await this.usersService.getUserByEmail(userData.user.email, API_SOURCE.GOOGLE)

			return userData.user
		}
	}

	decodeToken(authToken: string) {
		return this.jwtService.decode(authToken)
	}
}
