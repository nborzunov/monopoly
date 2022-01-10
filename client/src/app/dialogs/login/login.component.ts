import {
  animate,
  animateChild,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations'
import { Component, Input, OnInit } from '@angular/core'
import { currentLang, lang } from 'app/constants/lang.constants'
import { DialogsTypes, initialDialogsState } from '../dialogs.const'
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
export class LoginComponent implements OnInit {
  lang = lang[currentLang]

  show: boolean = false
  dialogType: DialogsTypes = DialogsTypes.LOGIN

  constructor(private dialogsService: DialogsService) {
    dialogsService.$state.subscribe((state: DialogsState) => {
      this.show = state[this.dialogType]
    })
  }

  ngOnInit(): void {}

  closeDialog(e: any) {

    e.stopPropagation()
    e.preventDefault()

    if (e?.target?.id === 'modal' || e?.currentTarget.id === 'close-button') {
      this.dialogsService.close(this.dialogType)
      return
    }

    // this.dialogsService.close(this.dialogType)
  }
}
