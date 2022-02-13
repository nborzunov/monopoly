import { Injectable } from "@nestjs/common"
import axios from "axios"
import { serialize } from "src/utils/serialize"

@Injectable()
export class GoogleApiService {
	getGoogleAuthURL() {
		const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"
		const options = {
			redirect_uri: `http://localhost:7000/google/redirect`,
			client_id: process.env.OAUTH_CLIENT_ID,
			access_type: "offline",
			response_type: "code",
			prompt: "consent",
			scope: [
				"https://www.googleapis.com/auth/userinfo.profile",
				"https://www.googleapis.com/auth/userinfo.email",
			].join(" "),
		}

		return `${rootUrl}?${serialize(options)}`
	}

	getTokens({ code, clientId, clientSecret, redirectUri }) {
		const url = "https://oauth2.googleapis.com/token"
		const values = {
			code,
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: redirectUri,
			grant_type: "authorization_code",
		}
		return axios
			.post(url, serialize(values), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.then((res) => res.data)
			.catch((error) => {
				console.error("Failed to fetch auth tokens")
				throw new Error(error.message)
			})
	}
}
