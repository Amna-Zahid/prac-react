import { goalsReducer as goals,
    currentGoalReducer as currentGoal,
    goalCategoriesReducer as goalCategories,
    goalFormReducer as updatedGoal,
    newSortIndicesReducer as newSortIndexes,
} from "./goalsReducer";
import { combineReducers } from "redux";

export default combineReducers({
    goals,
    currentGoal,
    goalCategories,
    updatedGoal,
    newSortIndexes
})
