import { Socket } from "ngx-socket-io"
import { Injectable } from "@angular/core"
import { AuthService } from "app/shared/services/auth.service"

@Injectable()
export class GamesService extends Socket {
	constructor(private socket: Socket, private authService: AuthService) {
		super({
			url: "http://localhost:80",
			options: {},
		})

		this.authService.$token.subscribe((token: any) => {
			this.ioSocket.auth = { auth_token: token }
		})
	}

	getCurrentGames() {
		return this.socket.emit("current_games")
	}

	onGetCurrentGames() {
		return this.socket.fromEvent("current_games")
	}

	createGame(game: any, userIsSure = false) {
		return this.socket.emit("create_game", {
			data: {
				game,
				userIsSure,
			},
			token: this.ioSocket.auth,
		})
	}

	onSuccessCreateGame() {
		return this.socket.fromEvent("create_game")
	}

	connectToGame(gameId: string, userIsSure = false) {
		return this.socket.emit("connect_to_game", {
			data: {
				gameId,
				userIsSure,
			},
			token: this.ioSocket.auth,
		})
	}

	onAskLeaveGame() {
		return this.socket.fromEvent("ask_leave_game")
	}

	leaveGame(gameId: string, userIsSure = false) {
		return this.socket.emit("leave_game", {
			data: {
				gameId,
				userIsSure,
			},
			token: this.ioSocket.auth,
		})
	}
}
