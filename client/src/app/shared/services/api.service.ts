import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(private http: HttpClient) {}

	getGoogleTemplate() {
		return this.http.get("/api/google", {
			params: {
				from: window.location.href,
			},
		})
	}

	checkValidation() {
		return this.http.get("/api/auth")
	}
}
