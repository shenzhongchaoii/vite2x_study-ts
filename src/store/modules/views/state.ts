export type AllVisitedViews = Array<string>
export type CurrentVisitedView = string

export interface ViewsState {
  allVisitedViews: AllVisitedViews;
  currentVisitedView: CurrentVisitedView;
}

export const state: ViewsState = {
  allVisitedViews: [],
  currentVisitedView: ''
}