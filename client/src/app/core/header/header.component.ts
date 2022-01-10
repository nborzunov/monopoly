import { Component } from '@angular/core'
import { currentLang, lang } from 'app/constants/lang.constants'
import { DialogsTypes } from 'app/dialogs/dialogs.const'
import { DialogsService } from 'app/dialogs/dialogs.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  lang = lang[currentLang]

  constructor(private dialogService: DialogsService) {}
  openLoginDialog() {
    this.dialogService.open(DialogsTypes.LOGIN)
  }
}
