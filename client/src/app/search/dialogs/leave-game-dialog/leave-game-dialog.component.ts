import { Component, Inject, OnInit, Optional } from '@angular/core'
import { modalAnimation } from 'app/constants/animations.constants'
import { currentLang, lang } from 'app/constants/lang.constants'
import { LEAVE_GAME_DIALOG_DATA } from 'app/constants/tokens'
import { DialogComponent } from 'app/core/components/dialog/dialog.component'
import { DialogRef } from 'app/core/services/dialog-ref'
import { DialogService } from 'app/core/services/dialog.service'
import { GamesService } from 'app/core/services/games.service'
import { LeaveGameDialogData } from 'app/types/dialogs.types'

@Component({
  selector: 'app-leave-game-dialog',
  templateUrl: './leave-game-dialog.component.html',
  styleUrls: ['./leave-game-dialog.component.scss'],
  animations: [modalAnimation]
})
export class LeaveGameDialogComponent extends DialogComponent {
  lang = lang[currentLang]
  constructor(
    dialogRef: DialogRef,
    dialogService: DialogService,
    @Optional()
    @Inject(LEAVE_GAME_DIALOG_DATA)
    public override dialogData: LeaveGameDialogData,
    public gamesService: GamesService
  ) {
    super(dialogRef, dialogService)
  }

  onLeaveGame() {
    this.dialogData.run()
    this.closeDialog()
  }
}
