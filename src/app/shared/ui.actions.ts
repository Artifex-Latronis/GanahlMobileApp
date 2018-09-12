import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';
export const START_DISPLAYING_UNIT = '[UI] Start Displaying Unit';
export const STOP_DISPLAYING_UNIT = '[UI] Stop Displaying Unit';
export const START_PULLING_UNIT = '[UI] Start Pulling Unit';
export const STOP_PULLING_UNIT = '[UI] Stop Pulling Unit';
export const START_MOVING_UNIT = '[UI] Start moving Unit';
export const STOP_MOVING_UNIT = '[UI] Stop moving Unit';

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

export class StartPullingUnit implements Action {
  readonly type = START_PULLING_UNIT;
}

export class StopPullingUnit implements Action {
  readonly type = STOP_PULLING_UNIT;
}

export class StartMovingUnit implements Action {
  readonly type = START_MOVING_UNIT;
}

export class StopMovingUnit implements Action {
  readonly type = STOP_MOVING_UNIT;
}

export type UIActions =
  StartLoading |
  StopLoading |
  StartDisplayingUnit |
  StopDisplayingUnit |
  StartPullingUnit |
  StopPullingUnit |
  StartMovingUnit |
  StopMovingUnit;


