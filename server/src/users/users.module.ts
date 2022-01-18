import { forwardRef, Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { usersProviders } from './users.providers'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule)]
})
export class UsersModule {}
