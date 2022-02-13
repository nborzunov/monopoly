export enum CELL_TYPES {
	START = "START",
	BUSINESS = "BUSINESS",
	CHANCE = "CHANCE",
	BANK = "BANK",
	JAIL = "JAIL",
	JACKPOT = "JACKPOT",
	OFFICER = "OFFICER",
	DIAMOND = "DIAMOND",
}

export const CELLS = {
	TOP_LEFT: {
		type: CELL_TYPES.START,
	},
	TOP: [
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.CHANCE,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BANK,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.CHANCE,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
	],
	TOP_RIGHT: {
		type: CELL_TYPES.JAIL,
	},
	RIGHT: [
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.CHANCE,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
	],
	BOTTOM_RIGHT: {
		type: CELL_TYPES.JACKPOT,
	},
	BOTTOM: [
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.CHANCE,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
	],
	BOTTOM_LEFT: {
		type: CELL_TYPES.OFFICER,
	},
	LEFT: [
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.DIAMOND,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.CHANCE,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
		{
			type: CELL_TYPES.BUSINESS,
		},
	],
}
