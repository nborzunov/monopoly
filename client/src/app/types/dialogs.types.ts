import type { Subject } from "rxjs"

export interface DialogData {
	outsidePointerEvents: Subject<Event>
}

export interface LeaveGameDialogData extends DialogData {
	gameId: string
	run: () => void
}
