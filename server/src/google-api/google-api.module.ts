import { Module } from "@nestjs/common"
import { AuthModule } from "src/auth/auth.module"
import { UsersModule } from "src/users/users.module"
import { GoogleApiController } from "./google-api.controller"
import { GoogleApiService } from "./google-api.service"
import { GoogleStrategy } from "./google-api.strategy"

@Module({
	controllers: [GoogleApiController],
	providers: [GoogleApiService, GoogleStrategy],
	imports: [UsersModule, AuthModule],
})
export class GoogleApiModule {}
