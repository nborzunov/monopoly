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

process.env.BASE_URL =
	process.env.NODE_ENV === "production" ? "https://tydusgg-monopoly.herokuapp.com/api" : "http://localhost:7000/api"

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `./env/${process.env.NODE_ENV}.env`,
		}),
		DatabaseModule,
		UsersModule,
		GoogleApiModule,
		AuthModule,
		GamesModule,
		process.env.NODE_ENV === "production"
			? ServeStaticModule.forRoot({
					rootPath: join(__dirname, "../../client/dist/client"),
			  })
			: undefined,
	].filter(Boolean),
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
