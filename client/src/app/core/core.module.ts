import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { DialogsModule } from 'app/dialogs/dialogs.module'
import { SharedModule } from 'app/shared/shared.module'

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [CommonModule, DialogsModule, SharedModule]
})
export class CoreModule {}
