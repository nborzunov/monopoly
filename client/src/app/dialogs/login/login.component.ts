import { Component, Inject, Optional } from "@angular/core"
import { modalAnimation } from "app/constants/animations.constants"
import { currentLang, lang } from "app/constants/lang.constants"
import { LOGIN_DIALOG_DATA } from "app/constants/tokens"
import { DialogComponent } from "app/core/components/dialog/dialog.component"
import { DialogRef } from "app/core/services/dialog-ref"
import { DialogService } from "app/core/services/dialog.service"
import { ApiService } from "app/shared/services/api.service"
import { DialogData } from "app/types/dialogs.types"

@Component({
	selector: "dialog-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	animations: [modalAnimation],
})
export class LoginComponent extends DialogComponent {
	lang = lang[currentLang]

	constructor(
		dialogRef: DialogRef,
		dialogService: DialogService,
		@Optional()
		@Inject(LOGIN_DIALOG_DATA)
		public override dialogData: DialogData,
		public apiService: ApiService,
	) {
		super(dialogRef, dialogService)
		super.ngOnInit()
	}

	getGoogleAuthUrl() {
		try {
			this.apiService.getGoogleTemplate().subscribe((data: any) => {
				window.location.href = data.url
			})
		} catch (err: any) {
			console.log(err.message)
		}
	}
}
