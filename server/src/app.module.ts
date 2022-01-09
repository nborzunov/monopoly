import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from './database/database.module'
import { GoogleApiModule } from './google-api/google-api.module'

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`
    }),
    DatabaseModule,
    GoogleApiModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
