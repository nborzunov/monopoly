import { Component } from "@angular/core"
import { currentLang, lang } from "app/constants/lang.constants"
import { LOGIN_DIALOG_DATA } from "app/constants/tokens"
import type { DialogService } from "app/core/services/dialog.service"
import { LoginComponent } from "app/dialogs/login/login.component"
import type { AuthService } from "app/shared/services/auth.service"

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
	lang = lang[currentLang]

	isAuthenticated = false
	user: any
	havePermissions = true
	constructor(private dialogService: DialogService, private authService: AuthService) {
		this.authService.$isAuthenticated.subscribe((val) => (this.isAuthenticated = val))
		this.authService.$user.subscribe((val) => (this.user = val))
	}

	openLoginDialog() {
		this.dialogService.open(
			LoginComponent,
			{
				config: { hasBackdrop: true },
			},
			LOGIN_DIALOG_DATA,
		)
	}
}
