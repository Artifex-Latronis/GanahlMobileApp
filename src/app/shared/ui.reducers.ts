import {
  UIActions,
  START_LOADING,
  STOP_LOADING,
  START_DISPLAYING_UNIT,
  STOP_DISPLAYING_UNIT,
  START_PULLING_UNIT,
  STOP_PULLING_UNIT,
  START_MOVING_UNIT,
  STOP_MOVING_UNIT
} from './ui.actions';

export interface State {
  isLoading: boolean;
  isDisplayingUnit: boolean;
  isPullingUnit: boolean;
  isMovingUnit: boolean;
}

const initialState: State = {
  isLoading: false,
  isDisplayingUnit: false,
  isPullingUnit: false,
  isMovingUnit: false
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case START_DISPLAYING_UNIT:
      return {
        ...state,
        isDisplayingUnit: true
      };
    case STOP_DISPLAYING_UNIT:
      return {
        ...state,
        isDisplayingUnit: false
      };
    case START_PULLING_UNIT:
      return {
        ...state,
        isPullingUnit: true
      };
    case STOP_PULLING_UNIT:
      return {
        ...state,
        isPullingUnit: false
      };
    case START_MOVING_UNIT:
      return {
        ...state,
        isMovingUnit: true
      };
    case STOP_MOVING_UNIT:
      return {
        ...state,
        isMovingUnit: false
      };
    default: {
      return state;
    }
  }
}

export const getIsLoading = (state: State) => state.isLoading;
export const getIsDisplayingUnit = (state: State) => state.isDisplayingUnit;
export const getIsPullingUnit = (state: State) => state.isPullingUnit;
export const getIsMovingUnit = (state: State) => state.isMovingUnit;
