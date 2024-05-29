import { OnDestroy, OnInit } from "@angular/core"
import { Component } from "@angular/core"
import { gameModeColors } from "app/constants/colors.constants"
import { currentLang, lang } from "app/constants/lang.constants"
import { CREATE_GAME_DIALOG_DATA, LEAVE_GAME_DIALOG_DATA } from "app/constants/tokens"
import { DialogService } from "app/core/services/dialog.service"
import { GamesService } from "app/core/services/games.service"
import { CreateGameDialogComponent } from "app/search/dialogs/create-game-dialog/create-game-dialog.component"
import { LeaveGameDialogComponent } from "app/search/dialogs/leave-game-dialog/leave-game-dialog.component"
import { AuthService } from "app/shared/services/auth.service"
import createRange from "app/shared/utils/createRange"
import { Game } from "app/types/types"
import { NgBlockUI } from "ng-block-ui"
import { BlockUI } from "ng-block-ui"

@Component({
	selector: "app-search-page",
	templateUrl: "./search-page.component.html",
	styleUrls: ["./search-page.component.scss"],
})
export class SearchPageComponent implements OnInit, OnDestroy {
	lang = lang[currentLang]
	isLoading = false
	results: Game[] = []
	gameModeColors = gameModeColors
	currentUser: any

	createRange = createRange

	@BlockUI("search-page") blockUI!: NgBlockUI

	constructor(
		private dialogService: DialogService,
		private gamesService: GamesService,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		this.loadData()
		this.gamesService.connect()

		this.gamesService.getCurrentGames()

		this.gamesService.onGetCurrentGames().subscribe((data: any) => {
			this.results = data
		})

		this.authService.$user.subscribe((user) => {
			this.currentUser = user
		})

		this.gamesService.onAskLeaveGame().subscribe((data: any) => {
			switch (data.type) {
				case "leaveGame":
					this.openLeaveGameDialog({
						...data,
						run: () => this.gamesService.leaveGame(data.gameId, true),
					})
					break
				case "connectGame":
					this.openLeaveGameDialog({
						...data,
						run: () => this.gamesService.connectToGame(data.gameId, true),
					})
					break
				case "createGame":
					this.openLeaveGameDialog({
						...data,
						run: () => this.gamesService.createGame(data.game, true),
					})
					break
			}
		})
	}

	ngOnDestroy(): void {
		this.gamesService.disconnect()
	}

	loadData() {
		this.isLoading = true
		this.blockUI.start()

		setTimeout(() => {
			this.gamesService.getCurrentGames()

			this.isLoading = false
			this.blockUI.stop()
		}, 1000)
	}

	openCreateGameDialog() {
		this.dialogService.open(
			CreateGameDialogComponent,
			{
				config: {
					hasBackdrop: true,
				},
			},
			CREATE_GAME_DIALOG_DATA,
		)
	}

	connectToGame(gameId: string) {
		this.gamesService.connectToGame(gameId)
	}

	openLeaveGameDialog(data: any) {
		this.dialogService.open(
			LeaveGameDialogComponent,
			{
				config: {
					hasBackdrop: true,
				},
			},
			LEAVE_GAME_DIALOG_DATA,
			data,
		)
	}

	leaveGame(gameId: string) {
		return this.gamesService.leaveGame(gameId)
	}
}
