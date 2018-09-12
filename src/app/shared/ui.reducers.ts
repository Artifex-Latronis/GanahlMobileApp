import { UIActions, START_LOADING, STOP_LOADING, START_DISPLAYING_UNIT, STOP_DISPLAYING_UNIT } from './ui.actions';

export interface State {
  isLoading: boolean;
  isDisplayingUnit: boolean;
}

const initialState: State = {
  isLoading: false,
  isDisplayingUnit: false
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
    default: {
      return state;
    }
  }
}

export const getIsLoading = (state: State) => state.isLoading;
export const getIsDisplayingUnit = (state: State) => state.isDisplayingUnit;
