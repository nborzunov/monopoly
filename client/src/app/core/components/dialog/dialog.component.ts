import { Component, OnInit } from '@angular/core'
import { DialogService } from 'app/core/services/dialog.service'
import { DialogData } from 'app/types/dialogs.types'

@Component({
  selector: 'app-dialog',
  template: ''
})
export class DialogComponent implements OnInit {
  show: boolean = true
  dialogData!: DialogData

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    if (this.dialogData) {
      this.dialogData.outsidePointerEvents.subscribe((event: Event) => {
        this.closeDialog()
      })
    }
  }

  closeDialog() {
    this.show = false
    this.dialogService.close()
  }
}
