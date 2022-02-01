import { ArrayType } from '@angular/compiler'
import { Component, Inject, Optional } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { modalAnimation } from 'app/constants/animations.constants'
import { gameModeColors } from 'app/constants/colors.constants'
import { GameModes, PLAYER_LIMITS } from 'app/constants/game.constants'
import { currentLang, lang } from 'app/constants/lang.constants'
import { CREATE_GAME_DIALOG_DATA } from 'app/constants/tokens'
import { DialogComponent } from 'app/core/components/dialog/dialog.component'
import { DialogService } from 'app/core/services/dialog.service'
import { DialogData } from 'app/types/dialogs.types'

@Component({
  selector: 'app-create-game-dialog',
  templateUrl: './create-game-dialog.component.html',
  styleUrls: ['./create-game-dialog.component.scss'],
  animations: [modalAnimation]
})
export class CreateGameDialogComponent extends DialogComponent {
  lang = lang[currentLang]
  gameModes = GameModes
  gameModeColors = gameModeColors
  playerLimits = PLAYER_LIMITS
  selectedGameMode = GameModes[0]
  rankedOpened = false
  casualGameFormGroup!: FormGroup

  constructor(
    dialogService: DialogService,
    @Optional()
    @Inject(CREATE_GAME_DIALOG_DATA)
    public override dialogData: DialogData
  ) {
    super(dialogService)

    this.casualGameFormGroup = new FormGroup({
      playersLimit: new FormControl(this.playerLimits[0]),
      roomPrivate: new FormControl({ value: false, disabled: true }),
      roomAutoStart: new FormControl({ value: true, disabled: true })
    })
  }

  selectGameMode(gameMode: typeof GameModes[number]): void {
    this.selectedGameMode = gameMode
  }

  set playersLimit(playersLimit: string) {
    this.casualGameFormGroup.get('playersLimit')?.setValue(playersLimit)
  }

  get playersLimit() {
    return this.casualGameFormGroup.get('playersLimit')?.value
  }
}
