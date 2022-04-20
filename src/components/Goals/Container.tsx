import React, {FC} from "react";
import {Grid, Typography} from "@material-ui/core";
import {SortableContainerProps, SortableContainer} from "react-sortable-hoc";
import {ICategorizedGoals, IGoalTemplate} from "../../api/types";
import SortableItem, {GoalItem} from "./Item";
export interface NewGoalType {
    SortId: number;
    Image: string;
    Category: string;
    GoalId: string;
    Horizon: string;
    IsPublished: boolean;
}
export interface SortableListProps extends SortableContainerProps{
    items: NewGoalType[],
}
const GoalsContainer =   SortableContainer(({items}: SortableListProps) => {
    return (
            <Grid alignItems="center"  container spacing={3}>
                {items.filter(({IsPublished}) => IsPublished).map((item, index) => (
                    <SortableItem index={index} key={`key-${item.SortId}`} value={item} />
                ))}
            </Grid>
    )
});
export const UnpublishedGoalContainer: FC<{ items: NewGoalType[] }> = ({items}) => {
    return (
        <Grid alignItems="center"  container spacing={3}>

            {items.filter(({IsPublished}) => !IsPublished).map((item, index) => (
                <GoalItem index={index} key={`key-${item.SortId}`} value={item} />
            ))}
        </Grid>
    )
}


export default GoalsContainer;
