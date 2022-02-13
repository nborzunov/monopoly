import type { OnInit } from "@angular/core"
import { Component } from "@angular/core"
import type { DialogRef } from "app/core/services/dialog-ref"
import type { DialogService } from "app/core/services/dialog.service"
import type { DialogData } from "app/types/dialogs.types"

@Component({
	selector: "app-dialog",
	template: "",
})
export class DialogComponent implements OnInit {
	show = true
	dialogData!: DialogData

	constructor(private dialogRef: DialogRef, private dialogService: DialogService) {}

	ngOnInit(): void {
		if (this.dialogData) {
			this.dialogData.outsidePointerEvents.subscribe(() => {
				this.closeDialog()
			})
		}
	}

	closeDialog() {
		this.show = false
		this.dialogRef.close()
	}
}
