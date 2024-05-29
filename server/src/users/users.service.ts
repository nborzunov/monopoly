import { forwardRef, Inject, Injectable } from "@nestjs/common"
import { AuthService } from "src/auth/auth.service"
import { API_SOURCE } from "src/constants/enums"
import { User } from "./users.model"

@Injectable()
export class UsersService {
	constructor(
		@Inject("USERS_REPOSITORY")
		private usersRepository: typeof User,
		@Inject(forwardRef(() => AuthService))
		private authService: AuthService,
	) {}

	async getUserByEmail(email: string, apiSource: API_SOURCE) {
		const user = await this.usersRepository.findOne({
			where: { email, apiSource },
			include: { all: true },
		})

		return user
	}

	async createUser(email: string, apiSource: API_SOURCE) {
		const newUser = await this.usersRepository.create({
			email: email,
			apiSource: apiSource,
		})

		return newUser
	}

	async validate(authToken: string) {
		return this.authService.validate(authToken)
	}
}
