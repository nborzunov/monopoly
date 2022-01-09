import { Module } from '@nestjs/common'
import { GoogleApiController } from './google-api.controller'
import { GoogleApiService } from './google-api.service'
import { GoogleStrategy } from './google-api.strategy'

@Module({
  controllers: [GoogleApiController],
  providers: [GoogleApiService, GoogleStrategy]
})
export class GoogleApiModule {}
