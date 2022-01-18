import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { DialogsTypes, initialDialogsState } from './dialogs.const'
import { DialogsState } from './dialogs.types'

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  $state: BehaviorSubject<DialogsState> = new BehaviorSubject<DialogsState>(
    initialDialogsState
  )

  constructor() {}

  get state() {
    return this.$state.getValue()
  }

  open(dialogType: DialogsTypes) {
    if (Object.prototype.hasOwnProperty.call(this.state, dialogType)) {
      this.$state.next({
        ...this.state,
        [dialogType]: true
      })
    }
  }

  close(dialogType: DialogsTypes) {
    if (Object.prototype.hasOwnProperty.call(this.state, dialogType)) {
      this.$state.next({
        ...this.state,
        [dialogType]: false
      })
    }
  }

  toggle(dialogType: DialogsTypes) {
    if (Object.prototype.hasOwnProperty.call(this.state, dialogType)) {
      this.$state.next({
        ...this.state,
        [dialogType]: !this.state[dialogType]
      })
    }
  }
}
