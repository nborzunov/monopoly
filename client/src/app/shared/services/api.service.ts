import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "environments/environment"

@Injectable({
	providedIn: "root",
})
export class ApiService {
	baseUrl = environment.backendUrl

	constructor(private http: HttpClient) {}

	getGoogleSigninUrl() {
		return this.http.get(`/api/google`)
	}

	checkValidation() {
		return this.http.get("/api/auth")
	}
}
