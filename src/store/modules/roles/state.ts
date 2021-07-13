import { _RouteLocationBase } from "vue-router"

export interface RouteLocationBase extends _RouteLocationBase {
  component: () => Promise<string>
  url?: any;
  children?: Array<RouteLocationBase>
}

export type User = { authorization?: string, [key: string]: any }
export type Menus = Array<RouteLocationBase>

export interface RolesState {
  user: User;
  menus: Menus
}

export const state: RolesState = {
  user: {},
  menus: []
}