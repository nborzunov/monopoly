import { Component, OnInit } from '@angular/core'
import { gameModeColors } from 'app/constants/colors.constants'
import { currentLang, lang } from 'app/constants/lang.constants'
import { CREATE_GAME_DIALOG_DATA } from 'app/constants/tokens'
import { DialogService } from 'app/core/services/dialog.service'
import { CreateGameDialogComponent } from 'app/search/dialogs/create-game-dialog/create-game-dialog.component'
import createRange from 'app/shared/utils/createRange'
import { Game } from 'app/types/types'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  lang = lang[currentLang]
  isLoading: boolean = false
  results: Game[] = []
  gameModeColors = gameModeColors

  createRange = createRange

  @BlockUI('search-page') blockUI!: NgBlockUI

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.isLoading = true
    this.blockUI.start()

    setTimeout(() => {
      this.results = [
        {
          options: {
            gameMode: 'QUICK_GAME',
            playersLimit: 4
          },
          players: [
            {
              id: '1',
              image: 'https://picsum.photos/400/500',
              name: 'Андрей'
            }
          ]
        },
        {
          options: {
            gameMode: 'RANKED_GAME',
            playersLimit: 5
          },
          players: [
            {
              id: '1',
              image: 'https://picsum.photos/200/300',
              name: 'Александр'
            },
            {
              id: '1',
              image: null,
              name: 'Николай'
            },
            {
              id: '1',
              image: 'https://picsum.photos/300/400',
              name: 'Елизавета'
            }
          ]
        },
        {
          options: {
            gameMode: 'CASUAL_GAME',
            playersLimit: 3
          },
          players: [
            {
              id: '1',
              image: null,
              name: 'Максим'
            }
          ]
        }
      ]

      this.isLoading = false
      this.blockUI.stop()
    }, 1000)
  }

  openCreateGameDialog() {
    this.dialogService.open(
      CreateGameDialogComponent,
      {
        hasBackdrop: true
      },
      CREATE_GAME_DIALOG_DATA
    )
  }
}
