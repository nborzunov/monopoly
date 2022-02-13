import { Injectable } from "@angular/core"
import { CookieService } from "ngx-cookie-service"
import { BehaviorSubject } from "rxjs"
import { ApiService } from "./api.service"

@Injectable({
	providedIn: "root",
})
export class AuthService {
	$isAuthenticated = new BehaviorSubject(false)
	$user = new BehaviorSubject(null)
	$token: BehaviorSubject<string> = new BehaviorSubject("")

	constructor(private apiService: ApiService, private cookiesService: CookieService) {
		this.apiService.checkValidation().subscribe((data: any) => {
			this.$user.next(data)
			this.$isAuthenticated.next(true)

			this.$token.next(this.cookiesService.get("auth_token"))
		})
	}

	get user() {
		return this.$user.getValue()
	}

	get isAuthenticated() {
		return this.$isAuthenticated.getValue()
	}

	get token() {
		return this.$token.getValue()
	}
}
