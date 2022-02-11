import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from './database/database.module'
import { GoogleApiModule } from './google-api/google-api.module'
import { AuthModule } from './auth/auth.module'
import { GoogleApiMiddleware } from './google-api/google-api.middleware'
import { GamesModule } from './games/games.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`
    }),
    DatabaseModule,
    UsersModule,
    GoogleApiModule,
    AuthModule,
    GamesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(GoogleApiMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
