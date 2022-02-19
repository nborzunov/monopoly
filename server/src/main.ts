import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as cookieParser from "cookie-parser"
import { SocketAdapter } from "./utils/adapter"

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })

	app.enableCors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})

	app.useWebSocketAdapter(new SocketAdapter(app))

	app.use(cookieParser())

	if (process.env.NODE_ENV === "production") {
		app.setGlobalPrefix("api")
	}

	const PORT = process.env.PORT || 5000

	await app.listen(PORT, () => console.log("Server started at port ", PORT))
}
bootstrap()
