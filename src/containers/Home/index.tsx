import React, {FC, useEffect, useState, ChangeEvent} from "react";
import {Button, Container, Grid, makeStyles, Paper, Tab, Tabs, Typography, useTheme} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import SwipeableViews  from "react-swipeable-views";

import {AppState, AppThunkDispatch} from "../../store/types";
import {NewGoalType} from "components/Goals/Container";
import {getAllGoals} from "store";
import TabPanel  from "components/TabPanel";
import noItemFound from "assets/no _item.jpg"

import {SortEndHandler} from "react-sortable-hoc";
import arrayMove from "array-move";
import {GoalsContainer, UnpublishedGoalContainer} from "components/Goals";
import {createSelector, Selector} from "reselect";
import {ICategorizedGoals, IGoalTemplate, SortItemBody} from "api/types";
import useStyles from "./styles";
import {useHistory} from "react-router";
import {sortGoals} from "../../api/GoalsApi";
import {Archive, Unarchive} from "@material-ui/icons";
import {setCurrentGoal, setGoalForm} from "../../store/actions/goalActions";

export interface IBriefGoal {
    short: NewGoalType[],
    medium: NewGoalType[],
    long: NewGoalType[]
}

const goalsSelector: Selector<AppState, ICategorizedGoals>  = (state: AppState ) => state.goals;

const getBriefGoals = (goals: IGoalTemplate[], publishStatus = true): NewGoalType[] => {
    // console.log(goals);
    return (
    goals.length > 0 ? goals.filter(({IsPublished}) => IsPublished === publishStatus).map(({SortId, Images, Category, GoalId, Horizon, IsPublished}) => {
        return {SortId, Image: (Images && Images.length > 0) ? Images[0].URL : '', Category, GoalId, Horizon, IsPublished};
    }) : []
)};


const briefGoal = createSelector<AppState, ICategorizedGoals,   IBriefGoal>(
    goalsSelector,
    goals => {
        return {
            short: getBriefGoals(goals.short),
            medium: getBriefGoals(goals.medium),
            long: getBriefGoals(goals.long)
        }
    }
);
const briefGoalUnPublished = createSelector<AppState, ICategorizedGoals,   IBriefGoal>(
    goalsSelector,
    goals => {
        return {
            short: getBriefGoals(goals.short, false),
            medium: getBriefGoals(goals.medium, false),
            long: getBriefGoals(goals.long, false)
        }
    }
);



const useFetch = (fetchActionCreator: Function) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    useEffect(() => {
        dispatch(fetchActionCreator());
    }, [])
}

const tabProps = (index: number) => ({id: `full-width-tab-${index}`, 'aria-controls': `full-width-tabpanel-${index}`});

const Home: FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const allGoals = useSelector<AppState, AppState['goals']>(({goals}) => goals);
    const briefGoals = useSelector<AppState, IBriefGoal>(briefGoal);
    const unpublishedGoals = useSelector<AppState, IBriefGoal>(briefGoalUnPublished)
    const [shortGoals, setShortGoals] = useState<NewGoalType[]>([]);
    const [shortGoalsUnPublished, setShortGoalsUnPublished] = useState<NewGoalType[]>([]);
    const [mediumGoals, setMediumGoals] = useState<NewGoalType[]>([]);
    const [mediumGoalsUnPublished, setMediumGoalsUnPublished] = useState<NewGoalType[]>([]);
    const [tabValue, setTabValue] = useState<number>(0);
    const [longGoals, setLongGoals] = useState<NewGoalType[]>([]);
    const [longGoalsUnPublished, setLongGoalsUnPublished] = useState<NewGoalType[]>([]);
    useEffect(() => {
        setShortGoalsUnPublished(unpublishedGoals.short);
        setShortGoals(briefGoals.short);
        setMediumGoals(briefGoals.medium);
        setMediumGoalsUnPublished(unpublishedGoals.medium);
        setLongGoals(briefGoals.long);
        setLongGoalsUnPublished(unpublishedGoals.long);
    }, [briefGoals]);
    useEffect(() => {
        (async () => {
            if (shortGoals.length > 0) {
                await postSortedGoals(shortGoals);
            }

        }) ()
    }, [shortGoals]);
    useEffect(() => {
        (async () => {
            if (mediumGoals.length > 0) {
                await postSortedGoals(mediumGoals);
            }

        }) ()
    }, [mediumGoals]);
    useEffect(() => {
        (async () => {
            if (longGoals.length > 1) {
                await postSortedGoals(longGoals);
            }

        }) ()
    }, [longGoals]);
    useFetch(getAllGoals);

    const postSortedGoals = (goals: NewGoalType[]) =>  {
        const Data = goals.map<SortItemBody>(({GoalId}, index) => ({GoalId, SortId: index + 1}));
        console.log(Data);
        sortGoals({Data});
    }

    const onSortEndShort: SortEndHandler = ({oldIndex, newIndex}) => {
        setShortGoals(oldItems => arrayMove(oldItems, oldIndex, newIndex));
    }
    const onSortEndMedium: SortEndHandler = ({oldIndex, newIndex}) => {
        setMediumGoals(oldItems => arrayMove(oldItems, oldIndex, newIndex));
    }
    const onSortEndLong: SortEndHandler = ({oldIndex, newIndex}) => {
        setLongGoals(oldItems => arrayMove(oldItems, oldIndex, newIndex));
    }
    const addNewGoal = () => {
        localStorage.removeItem('files');
        localStorage.removeItem('verticalVideo');
        localStorage.removeItem('horizontalVideo');
        dispatch(setCurrentGoal(null));
        dispatch(setGoalForm(null));
        history.push("/goalsAdd");
    }

    const handleChange = (event: ChangeEvent<{}>, value: number) => {
        setTabValue(value);
    }
    const handleChangeIndex = (index: number) => {
        setTabValue(index);
    }
    const noItemSelector = (items: any[]) => items.length === 0 ?
        <div className={classes.noItemContainer}><img src={noItemFound} alt="no record found"/></div> : ''

    return (
        <Container className={classes.containerRoot}>
            <Button  onClick={addNewGoal} style={{marginBottom: 20}}  variant="contained" size="medium" color="primary">
                Add new preset goal
            </Button>
            <Paper square

            >
                <Tabs value={tabValue}
                      onChange={handleChange}
                      variant="fullWidth"
                      indicatorColor="primary"
                      textColor="primary"
                >
                    <Tab  icon={<Unarchive />} label="Published" {...tabProps(0)} />
                    <Tab icon={<Archive />} label="Unpublished" {...tabProps(1)} />
                </Tabs>
            </Paper>
            <SwipeableViews axis='x' index={tabValue} onChangeIndex={handleChangeIndex} >
                <TabPanel value={tabValue} index={0} dir={theme.direction}>
                    <>
                        <div className={classes.goalsContainer}>
                            <Typography variant="h3">Short term</Typography>
                            {noItemSelector(shortGoals)}
                            <GoalsContainer distance={1} items={shortGoals}  onSortEnd={onSortEndShort} axis={"xy"} helperClass={classes.helperSortable}/>
                        </div>
                        <div className={classes.goalsContainer}>
                            <Typography variant="h3">Medium term</Typography>
                            {noItemSelector(mediumGoals)}
                            <GoalsContainer distance={1} items={mediumGoals}  onSortEnd={onSortEndMedium} axis={"xy"} helperClass={classes.helperSortable}/>
                        </div>
                        <div className={classes.goalsContainer}>
                            <Typography variant="h3">Long term</Typography>
                            {noItemSelector(longGoals)}
                            <GoalsContainer distance={1} items={longGoals}  onSortEnd={onSortEndLong} axis={"xy"} helperClass={classes.helperSortable}/>
                        </div>
                    </>
                </TabPanel>
                <TabPanel value={tabValue} index={1} dir={theme.direction}>
                    <div className={classes.goalsContainer}>
                        <Typography variant="h3">Short term </Typography>
                        {noItemSelector(shortGoalsUnPublished)}
                        <UnpublishedGoalContainer items={shortGoalsUnPublished} />
                    </div>
                    <div className={classes.goalsContainer}>
                        <Typography variant="h3">Medium term</Typography>
                        {noItemSelector(mediumGoalsUnPublished)}
                        <UnpublishedGoalContainer items={mediumGoalsUnPublished} />
                    </div>
                    <div className={classes.goalsContainer}>
                        <Typography variant="h3">Long term</Typography>
                        {noItemSelector(longGoalsUnPublished)}
                        <UnpublishedGoalContainer items={longGoalsUnPublished} />
                    </div>

                </TabPanel>
            </SwipeableViews>


        </Container>
    );
}

export default Home;
