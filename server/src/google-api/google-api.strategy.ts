import { PassportStrategy } from "@nestjs/passport"
import { VerifyCallback } from "passport-google-oauth20"
import { Strategy } from "passport-google-oauth20"
import { config } from "dotenv"

import { Injectable } from "@nestjs/common"

config()

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
	constructor() {
		super({
			clientID: process.env.OAUTH_CLIENT_ID,
			clientSecret: process.env.OAUTH_CLIENT_SECRET,
			callbackURL: `${process.env.BASE_URL}/google/redirect`,
			userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
			scope: ["email", "profile"],
		})
	}

	async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
		const { name, emails, photos } = profile
		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			picture: photos[0].value,
			accessToken,
		}
		done(null, user)
	}
}
