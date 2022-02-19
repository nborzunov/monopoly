import { MiddlewareConsumer, NestModule } from "@nestjs/common"
import { Module, RequestMethod } from "@nestjs/common"
import { UsersModule } from "./users/users.module"
import { ConfigModule } from "@nestjs/config"
import { DatabaseModule } from "./database/database.module"
import { GoogleApiModule } from "./google-api/google-api.module"
import { AuthModule } from "./auth/auth.module"
import { GoogleApiMiddleware } from "./google-api/google-api.middleware"
import { GamesModule } from "./games/games.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"

console.log(`${process.env.NODE_ENV}.env`)
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `${process.env.NODE_ENV}.env`,
		}),
		DatabaseModule,
		UsersModule,
		GoogleApiModule,
		AuthModule,
		GamesModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "../../client/dist/client"),
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(GoogleApiMiddleware).forRoutes({
			path: "*",
			method: RequestMethod.ALL,
		})
	}
}
