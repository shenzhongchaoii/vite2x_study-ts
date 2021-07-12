import { _RouteLocationBase } from "vue-router"

export type User = { authorization?: string, [key: string]: any }
export type Menus = Array<_RouteLocationBase>

export interface RolesState {
  user: User;
  menus: Menus
}

export const state: RolesState = {
  user: {},
  menus: []
}