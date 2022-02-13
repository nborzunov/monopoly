import { animate, style, transition, trigger } from "@angular/animations"

export const modalAnimation = trigger("inOutAnimation", [
	transition(":enter", [style({ opacity: 0 }), animate("0.2s ease-out", style({ opacity: 1 }))]),
	transition(":leave", [style({ opacity: 1 }), animate("0.2s ease-in", style({ opacity: 0 }))]),
])

export const modalExpireDuration = 300
