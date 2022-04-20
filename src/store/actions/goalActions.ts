import {
    AppThunk,
    CurrentGoal,
    GoalActions,
    SetCurrentGoalAction,
    SetGoalAction,
    SetGoalCategories,
    SetGoalFormAction,
    SetNewSortIndexes
} from "store/types";
import {getGoals} from "api/GoalsApi";
import {ICategorizedGoals, IGoalTemplate, NewSortIndexes} from "api/types";
import {IGoalFormWithImage} from "../../containers/GoalAdd/form";

const setGoals = (payload: ICategorizedGoals): SetGoalAction => ({type: GoalActions.SET_GOALS, payload})
const setGoalForm = (payload: IGoalFormWithImage): SetGoalFormAction => ({type: GoalActions.UPDATED_GOAL, payload})
const setCurrentGoal = (payload: CurrentGoal): SetCurrentGoalAction => ({type: GoalActions.CURRENT_GOAL, payload})
const setGoalCategories = (payload: string[]): SetGoalCategories => ({type: GoalActions.GOAL_CATEGORY, payload})
const setNewSortIndices = (payload: NewSortIndexes): SetNewSortIndexes => ({type: GoalActions.NEW_SORT_INDEXES, payload});
const getAllGoals = (): AppThunk => (
    (dispatch => (
            getGoals().then(({categorizedGoals, newSortIndex}) => {
                dispatch(setGoals(categorizedGoals));
                dispatch(setNewSortIndices(newSortIndex));
                const shortCategories = categorizedGoals.short.map<string>(({Category}) => Category);
                const mediumCategories = categorizedGoals.medium.map<string>(({Category}) => Category);
                const longCategories = categorizedGoals.long.map<string>(({Category}) => Category);
                dispatch(setCurrentGoal(null));
                dispatch(setGoalForm(null));
                dispatch(setGoalCategories([...shortCategories, ...mediumCategories, ...longCategories]))
            })
        )
    )
);

const getCurrentGoalDetail = (goals: IGoalTemplate[], goalId: string): CurrentGoal => (
    goals.find(({GoalId}) => GoalId === goalId) || null
)

const getCurrentGoal = (horizon: string, goalId: string): AppThunk => (
    (dispatch, getState) => (
        Promise.resolve().then(() => {
            const {short, medium, long} = getState().goals;
            switch (horizon) {
                case 'Short':
                    dispatch(setCurrentGoal(getCurrentGoalDetail(short, goalId)));
                    break;
                case 'Medium':
                    dispatch(setCurrentGoal(getCurrentGoalDetail(medium, goalId)));
                    break;
                case 'Long':
                    dispatch(setCurrentGoal(getCurrentGoalDetail(long, goalId)));
                    break;
            }

        })
    )
)

export {
    getAllGoals,
    setCurrentGoal,
    setGoalCategories,
    getCurrentGoal,
    setGoals,
    setGoalForm
}
