import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { CoreModule } from "app/core/core.module"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { SharedModule } from "./shared/shared.module"
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from "@angular/router"
import { BlockUIModule } from "ng-block-ui"
import { SearchModule } from "./search/search.module"
import type { SocketIoConfig } from "ngx-socket-io"
import { SocketIoModule } from "ngx-socket-io"
import { CookieService } from "ngx-cookie-service"

const config: SocketIoConfig = { url: "http://localhost:80", options: {} }

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		SharedModule,
		HttpClientModule,
		RouterModule,
		BlockUIModule.forRoot({}),
		SearchModule,
		SocketIoModule.forRoot(config),
	],
	bootstrap: [AppComponent],
	providers: [CookieService],
})
export class AppModule {}
