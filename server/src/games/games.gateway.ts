import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets"
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { GamesService } from "./games.service"
import { Server, Socket } from "socket.io"

@WebSocketGateway(3222)
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server

	constructor(private readonly gamesService: GamesService) {}

	async handleConnection(@ConnectedSocket() socket: Socket) {
		try {
			const user = await this.gamesService.getUserFromSocket(socket)

			console.log("User with email", user.email, 'connected to socket "games"')
		} catch (err) {
			console.error(err.message)
		}
	}

	async handleDisconnect(@ConnectedSocket() socket: Socket) {
		try {
			const user = await this.gamesService.getUserFromSocket(socket)

			console.log("User with email", user.email, 'disconnected from socket "games"')
		} catch (err) {
			console.error(err.message)
		}
	}

	@SubscribeMessage("current_games")
	async currentGames() {
		const games = await this.gamesService.getAllGames()
		this.server.emit("current_games", games)
	}

	@SubscribeMessage("create_game")
	async createGame(@ConnectedSocket() socket: Socket, @MessageBody() res: any) {
		socket.handshake.auth = res.token
		const user = await this.gamesService.getUserFromSocket(socket)

		try {
			const games = await this.gamesService.createGame(user, res.data.game, res.data.userIsSure)

			this.server.emit("current_games", games)
			socket.emit("create_game")
		} catch ({ error }) {
			switch (error.type) {
				case "ALREADY_IN_ROOM":
					socket.emit("ask_leave_game", {
						type: "createGame",
						game: res.data.game,
					})
					break
			}
		}
	}

	@SubscribeMessage("connect_to_game")
	async connectToGame(@ConnectedSocket() socket: Socket, @MessageBody() res: any) {
		socket.handshake.auth = res.token

		const user = await this.gamesService.getUserFromSocket(socket)

		try {
			const games = await this.gamesService.connectToGame(user, res.data.gameId, res.data.userIsSure)

			this.server.emit("current_games", games)
		} catch ({ error }) {
			switch (error.type) {
				case "ALREADY_IN_ROOM":
					socket.emit("ask_leave_game", {
						gameId: res.data.gameId,
						type: "connectGame",
					})
					break
			}
		}
	}

	@SubscribeMessage("leave_game")
	async leaveGame(@ConnectedSocket() socket: Socket, @MessageBody() res: any) {
		socket.handshake.auth = res.token
		const user = await this.gamesService.getUserFromSocket(socket)

		try {
			const games = await this.gamesService.leaveGame(user, res.data.userIsSure)

			this.server.emit("current_games", games)
		} catch ({ error }) {
			switch (error.type) {
				case "ALREADY_IN_ROOM":
					socket.emit("ask_leave_game", {
						gameId: res.data.gameId,
						type: "leaveGame",
					})
					break
			}
		}
	}
}
