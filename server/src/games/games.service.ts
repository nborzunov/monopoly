import { Injectable } from "@nestjs/common"
import { Socket } from "socket.io"
import { WsException } from "@nestjs/websockets"
import { AuthService } from "src/auth/auth.service"
import { Game } from "src/libs/game"
import { GameFactory } from "src/libs/game-factory"

let games: Game[] = [
	// TODO: Mocked data, remove when implement game engine
	// @ts-ignore
	{
		id: "1",
		isStarted: false,
		options: {
			gameMode: "QUICK_GAME",
			playersLimit: 4,
			roomPrivate: false,
			roomAutoStart: true,
		},
		players: [
			{
				id: "1",
				picture: "https://picsum.photos/400/500",
				given_name: "Андрей",
			},
		],
	},
]

@Injectable()
export class GamesService {
	constructor(private readonly authService: AuthService) {}

	async getUserFromSocket(socket: Socket) {
		const authToken = socket.handshake.auth.auth_token

		const user = await this.authService.validate(authToken)

		if (!user) {
			throw new WsException("Invalid credentials.")
		}
		return user
	}

	async getAllGames() {
		return games
	}

	async createGame(owner: any, newGame: any, userIsSure = false) {
		const { gameMode, ...options } = newGame

		const userRoom = this.checkUserInRoom(owner)

		if (userRoom) {
			this.leaveGame(owner, userIsSure)
		}

		const game = GameFactory.create(owner, gameMode, options)

		games.push(game)

		return games
	}

	connectToGame(user: any, gameId: string, userIsSure = false) {
		const game = this.checkGameExists(gameId)

		const userRoom = this.checkUserInRoom(user)

		if (userRoom && userRoom.id !== gameId) {
			this.leaveGame(user, userIsSure || !userRoom)
		}

		if (!userRoom || userRoom?.id !== game.id) {
			game.players.push(user)
		}

		return games
	}

	leaveGame(user: any, userIsSure = false) {
		const userRoom = this.checkUserInRoom(user)

		if (userIsSure && userRoom) {
			userRoom.players = userRoom.players.filter((player) => player.id !== user.id)

			if (userRoom.players.length === 0) {
				games = games.filter((game) => game.id !== userRoom.id)
			}
		} else if (!userIsSure && userRoom) {
			throw new WsException({
				message: "Ask user for sure",
				type: "ALREADY_IN_ROOM",
			})
		}

		return games
	}

	private checkUserInRoom(user: any) {
		return games.find((game) => game.players.find((player) => player.id === user.id))
	}

	private checkGameExists(gameId: any) {
		const game = games.find((game) => gameId === game.id)

		if (!game) {
			throw new WsException("Invalid game id.")
		}

		return game
	}
}
