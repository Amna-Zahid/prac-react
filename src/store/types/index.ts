import {GoalsOrderIds, ICategorizedGoals, IGoalTemplate, NewSortIndexes} from "api/types";
import {Dispatch} from "react";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {IGoalFormWithImage} from "containers/GoalAdd/form";

export enum GoalActions  {
    SET_GOALS = "SET_GOALS",
    CURRENT_GOAL = "CURRENT_GOAL",
    GOAL_CATEGORY = "GOAL_CATEGORY",
    UPDATED_GOAL = "UPDATED_GOAL",
    NEW_SORT_INDEXES = "NEW_SORT_INDEXES",
    SORT_GOALS = "SORT_GOALS"
}
export interface SetGoalAction {
    type: GoalActions.SET_GOALS;
    payload: ICategorizedGoals
}
export interface SetNewSortIndexes {
    type: GoalActions.NEW_SORT_INDEXES,
    payload: NewSortIndexes;
}
export interface SetCurrentGoalAction {
    type: GoalActions.CURRENT_GOAL,
    payload: CurrentGoal
}
export interface SetGoalCategories {
    type: GoalActions.GOAL_CATEGORY,
    payload: string[]
}
export interface SetGoalFormAction {
    type: GoalActions.UPDATED_GOAL,
    payload: IGoalFormWithImage
}
export type AppActions = SetGoalAction
    | SetCurrentGoalAction | SetGoalCategories
    | SetGoalFormAction | SetNewSortIndexes;
export type ThunkActions = AppActions;
export type CurrentGoal = IGoalTemplate | null;
export interface AppState {
    goals: ICategorizedGoals,
    currentGoal: CurrentGoal;
    goalCategories: string[];
    updatedGoal: IGoalFormWithImage;
    newSortIndexes: NewSortIndexes;
}
export const initialState: AppState = {
    goals: {
        long: [],
        medium: [],
        short: []
    },
    currentGoal: null,
    updatedGoal: null,
    goalCategories: [],
    newSortIndexes: {short: 1, medium: 1, long: 1}
}
export type ThunkResults = Promise<ICategorizedGoals | void>;
export type AppThunkDispatch = ThunkDispatch<AppState, undefined, AppActions>;
export type AppDispatch = Dispatch<AppActions>;
export type AppThunk = ThunkAction<ThunkResults, AppState, unknown, ThunkActions>
