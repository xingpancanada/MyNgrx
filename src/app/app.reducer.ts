import { Action } from "@ngrx/store";
import { MaxAppActions, START_LOADING, STOP_LOADING } from "./app.actions";
import { AppState, MaxState } from "./Interfaces/AppState";
//max115
const initialState: MaxState = {
  isLoading: false
};

export function maxAppReducer(state = initialState, action: MaxAppActions){
  switch(action.type){
    case START_LOADING:
      return {
        isLoading: true
      };
    case STOP_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}

//without select: get value, not observable
export const getIsLoading = (state: AppState) => state.maxApp.isLoading;
