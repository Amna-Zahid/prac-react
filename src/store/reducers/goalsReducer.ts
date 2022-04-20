import {AppActions, CurrentGoal, GoalActions, initialState} from "store/types";
import {ICategorizedGoals, NewSortIndexes} from "../../api/types";
import {IGoalFormWithImage} from "containers/GoalAdd/form";

export const goalsReducer = (state = initialState.goals, action: AppActions ): ICategorizedGoals => {
    return action.type === GoalActions.SET_GOALS ? action.payload : state;
}
export const goalFormReducer = (state = initialState.updatedGoal, action: AppActions) : IGoalFormWithImage => {
    return action.type === GoalActions.UPDATED_GOAL ? action.payload : state;
}
export const currentGoalReducer = (state = initialState.currentGoal, action: AppActions): CurrentGoal => {
    return action.type === GoalActions.CURRENT_GOAL ?  action.payload : state;
}
export const goalCategoriesReducer = (state = initialState.goalCategories, action: AppActions): string[] => {
    return action.type === GoalActions.GOAL_CATEGORY ?  action.payload : state;
}
export const newSortIndicesReducer = (state = initialState.newSortIndexes, action: AppActions): NewSortIndexes => {
    return action.type === GoalActions.NEW_SORT_INDEXES ?  action.payload : state;
}
