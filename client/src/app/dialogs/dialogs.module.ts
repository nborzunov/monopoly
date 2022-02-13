import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { LoginComponent } from "./login/login.component"
import { SharedModule } from "app/shared/shared.module"
import { DialogService } from "app/core/services/dialog.service"
@NgModule({
	declarations: [LoginComponent],
	exports: [LoginComponent],
	imports: [CommonModule, SharedModule],
	providers: [DialogService],
})
export class DialogsModule {}
