import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { DialogsService } from './dialogs.service'
import { SharedModule } from 'app/shared/shared.module'

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [CommonModule, SharedModule]
})
export class DialogsModule {}
