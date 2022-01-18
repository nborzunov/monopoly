import { DialogsState } from './dialogs.types'

export enum DialogsTypes {
  LOGIN = 'LOGIN'
}

export const initialDialogsState: DialogsState = {
  [DialogsTypes.LOGIN]: false
}
