import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GoogleApiService } from './google-api.service'

@Controller('google')
export class GoogleApiController {
  constructor(private readonly googleApiService: GoogleApiService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return 'hello'
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.googleApiService.googleLogin(req)
  }
}
