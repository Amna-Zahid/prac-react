import React, {FC, useState} from "react";
import {SortableElementProps, SortableElement, WrappedComponent} from "react-sortable-hoc";
import {getCurrentGoal} from "store/actions/goalActions";

import {IGoalTemplate} from "../../api/types";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
    makeStyles
} from "@material-ui/core";
import {DeleteForeverSharp, EditSharp} from "@material-ui/icons";
import {NewGoalType} from "./Container";
import {useDispatch} from "react-redux";
import {AppDispatch, AppThunkDispatch} from "../../store/types";
import {useHistory} from "react-router";


export interface SortableItemProps extends SortableElementProps {
    value: NewGoalType;
}

const useStyles = makeStyles({
    media: {
        height: 120,
    },
    cardContent: {
        padding: '6px 8px 0px 8px',
        '& .MuiTypography-h5': {
            fontSize: 15,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        }
    },
    cardActionContainer: {
        justifyContent: 'flex-end',
        '& .MuiIconButton-root': {
            padding: 4
        }
    },
    sortId4: {
        backgroundColor: '#FF0000'
    },
    iconStyle: {
        fontSize: 20
    }
})

export const GoalItem: WrappedComponent<SortableItemProps> = ({value: {Image, Category, SortId, GoalId, Horizon, IsPublished}}: SortableItemProps) => {
    const { media, cardContent, cardActionContainer, sortId4, iconStyle } = useStyles();
    const dispatch = useDispatch<AppThunkDispatch>();
    const history = useHistory();
    const onEdit = async () => {
        localStorage.removeItem('files');
        localStorage.removeItem('verticalVideo');
        localStorage.removeItem('horizontalVideo');
        await dispatch(getCurrentGoal(Horizon, GoalId));
        history.push("/goalsAdd")
    }
    const [elevation, setElevation] = useState<number>(1);
    return (
        <Grid item xs={3}>
            <Card elevation={elevation} onMouseOver={() => { setElevation(3)}} onMouseOut={() => { setElevation(1)}} >
                <CardActionArea>
                    <CardMedia
                        className={media}
                        image={Image}
                        title="Contemplative Reptile"
                    />
                    <CardContent className={cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {Category}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={cardActionContainer}>
                    {/*<IconButton size="small" ari-label="delete">*/}
                    {/*    <DeleteForeverSharp style={{color: '#EE4B63'}} className={iconStyle} />*/}
                    {/*</IconButton>*/}
                    <IconButton size="small"  onClick={onEdit} ari-label="Edit">
                        <EditSharp className={iconStyle} />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default SortableElement(GoalItem);
