import { animate, style, transition, trigger } from '@angular/animations'
import { Component } from '@angular/core'
import { currentLang, lang } from 'app/constants/lang.constants'
import { DialogsTypes } from 'app/dialogs/dialogs.const'
import { DialogsService } from 'app/dialogs/dialogs.service'
import { AuthService } from 'app/shared/services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class HeaderComponent {
  lang = lang[currentLang]

  isAuthenticated = false
  user: any
  constructor(
    private dialogService: DialogsService,
    private authService: AuthService
  ) {
    this.authService.$isAuthenticated.subscribe(
      (val) => (this.isAuthenticated = val)
    )
    this.authService.$user.subscribe((val) => (this.user = val))
  }

  openLoginDialog() {
    this.dialogService.open(DialogsTypes.LOGIN)
  }
}
