import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from './auth/auth.middleware';
  
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })

  app.use(cookieParser())
  
  const PORT = process.env.PORT || 5000

  await app.listen(PORT, () => console.log('Server started at port ', PORT))
}
bootstrap()
