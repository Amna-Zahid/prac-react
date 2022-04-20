import {AppState, initialState, AppActions} from "store/types";
import {compose, createStore, applyMiddleware, Store} from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import rootReducer from "store/reducers"
import {getAllGoals} from "./actions/goalActions";
import {loadState, saveState} from "./localStorage";
const currentGoal = loadState('currentGoal');
const updatedGoal = loadState('updatedGoal');
const newSortIndexes = loadState('newSortIndexes') || initialState.newSortIndexes;

function configureStore(initialSate: AppState) {
    const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose();
    return createStore(
        rootReducer,
        {...initialSate, currentGoal, updatedGoal, newSortIndexes},
        composeEnhancer(applyMiddleware(thunk, reduxImmutableStateInvariant()))
    )
}
const store: Store<AppState, AppActions> = configureStore(initialState);
store.subscribe(() => {
    const {currentGoal, updatedGoal, newSortIndexes} = store.getState();
    saveState('currentGoal',currentGoal);
    saveState('updatedGoal', updatedGoal);
    saveState('newSortIndexes', newSortIndexes)
})
export default store;
export {
    getAllGoals
}
