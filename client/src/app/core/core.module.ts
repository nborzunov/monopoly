import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { DialogsModule } from 'app/dialogs/dialogs.module'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'
import { OverlayModule } from '@angular/cdk/overlay'
import { DialogComponent } from './components/dialog/dialog.component'
import { MatMenuModule } from '@angular/material/menu'

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DialogComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    DialogsModule,
    SharedModule,
    RouterModule,
    OverlayModule,
    MatMenuModule
  ]
})
export class CoreModule {}
