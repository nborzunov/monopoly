import { animate, style, transition, trigger } from '@angular/animations'
import { Component } from '@angular/core'
import { currentLang, lang } from 'app/constants/lang.constants'
import { ApiService } from 'app/shared/services/api.service'
import { AuthService } from 'app/shared/services/auth.service'
import { DialogsTypes } from '../dialogs.const'
import { DialogsService } from '../dialogs.service'
import { DialogsState } from '../dialogs.types'

@Component({
  selector: 'dialog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent {
  lang = lang[currentLang]

  show: boolean = false
  dialogType: DialogsTypes = DialogsTypes.LOGIN

  constructor(
    private dialogsService: DialogsService,
    private authService: AuthService
  ) {
    dialogsService.$state.subscribe((state: DialogsState) => {
      this.show = state[this.dialogType]
    })
  }

  closeDialog(e: any) {
    e.stopPropagation()
    e.preventDefault()

    if (e?.target?.id === 'modal' || e?.currentTarget.id === 'close-button') {
      this.dialogsService.close(this.dialogType)
    }

    // this.dialogsService.close(this.dialogType)
  }

  getGoogleAuthUrl() {
    window.location.href = 'http://localhost:7000/google'
  }
}
