import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlockUIModule } from 'ng-block-ui'
import { SearchPageComponent } from './components/search-page/search-page.component'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'
import { DialogService } from 'app/core/services/dialog.service'
import { CreateGameDialogComponent } from './dialogs/create-game-dialog/create-game-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { LeaveGameDialogComponent } from './dialogs/leave-game-dialog/leave-game-dialog.component'

@NgModule({
  declarations: [
    SearchPageComponent,
    CreateGameDialogComponent,
    LeaveGameDialogComponent
  ],
  imports: [
    CommonModule,
    BlockUIModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  providers: [DialogService]
})
export class SearchModule {}
