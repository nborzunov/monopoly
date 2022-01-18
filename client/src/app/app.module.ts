import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from 'app/core/core.module'
import { DialogsModule } from './dialogs/dialogs.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PagesModule } from './pages/pages.module'
import { SharedModule } from './shared/shared.module'
import { HttpClientModule } from '@angular/common/http'
import { ApiService } from './shared/services/api.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    DialogsModule,
    PagesModule,
    SharedModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
