import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations'
import { Component, Input, OnInit } from '@angular/core'
import { DialogsTypes, initialDialogsState } from '../dialogs.const'
import { DialogsService } from '../dialogs.service'
import { DialogsState } from '../dialogs.types'

@Component({
  selector: 'dialog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  	host: {
		"[@modalView]": "show"
	},
  animations: [
    trigger('modalView', [
      // If this modal-view is rendered as part of a page refresh, we don't
      // want to include any animations - animations are for mental modal; and,
      // if this is the initial page load, there can be no meaningful mental
      // model portrayed for the user and the modal window. As such, we need to
      // denote the modal-view has having a "transition" so that the nested
      // view transitions will be inherently blocked.
      transition('void => 0', []),

      // While we don't want a transition on page-refresh, we certainly do want
      // the animations to play when the modal-view is opened or closed during
      // the normal control flow of the application. As such, for the :enter
      // :leave transitions, we want to query for the router-outlet component
      // and ask its animations to run (if it has any).
      transition(':enter, :leave', [
        // As the modal-view enters or leaves, we want to allow any of
        // nested view animations to execute.
        // --
        // CAUTION: This query selector does not get the simulated
        // encapsulation attribute selectors. This will go DEEP through
        // the descendant DOM tree if you're not careful. As such, we
        // MUST USE the "limit" property to prevent deeper matches from
        // being exercised.
        query('@*', animateChild(), {
          limit: 1,
          optional: true
        })
      ]),

      // By default, we want to block all nested animations (and then
      // selectively re-enable them using the transitions above). As such, we
      // have to define a generic no-op transition from every state to every
      // other state. This transition will inherently block the transitions
      // contained within any nested views.
      transition('* <=> *', [])
    ])
  ]
})
export class LoginComponent implements OnInit {
  show: boolean = false

  dialogType: DialogsTypes = DialogsTypes.LOGIN

  constructor(private dialogsService: DialogsService) {
    dialogsService.$state.subscribe((state: DialogsState) => {
      this.show = state[this.dialogType]
    })
  }

  ngOnInit(): void {}

  closeDialog(e: any) {
    e.preventDefault()
    console.log(e)
    if (e?.target?.id === 'modal') {
      this.dialogsService.close(this.dialogType)
      return
    }

    this.dialogsService.close(this.dialogType)
  }
}
