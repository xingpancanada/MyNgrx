import { Action } from "@ngrx/store";

export const START_LOADING = '[MAXAPP] Start Loading';
export const STOP_LOADING = '[MAXAPP] Stop Loading';

export class StartLoading implements Action{
  readonly type = START_LOADING;
}

export class StopLoading implements Action{
  readonly type = STOP_LOADING;
}

export type MaxAppActions = StartLoading | StopLoading;
