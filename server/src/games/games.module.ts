import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { GamesController } from './games.controller'
import { GamesGateway } from './games.gateway'
import { GamesService } from './games.service'

@Module({
  imports: [AuthModule],
  controllers: [GamesController],
  providers: [GamesGateway, GamesService],
  exports: [GamesService]
})
export class GamesModule {}
