import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';
export const START_DISPLAYING_UNIT = '[UI] Start Displaying Unit';
export const STOP_DISPLAYING_UNIT = '[UI] Stop Displaying Unit';

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export class StartDisplayingUnit implements Action {
  readonly type = START_DISPLAYING_UNIT;
}

export class StopDisplayingUnit implements Action {
  readonly type = STOP_DISPLAYING_UNIT;
}

export type UIActions = StartLoading | StopLoading | StartDisplayingUnit | StopDisplayingUnit;
