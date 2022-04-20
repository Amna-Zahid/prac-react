import React, {MouseEventHandler} from 'react';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {makeStyles, Typography} from "@material-ui/core";

const useStyle = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        cursor: 'pointer',
        color: '#0d2e6e',
        '& .MuiTypography-subtitle1': {
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '18px'
        },
        uploadContainer: {
            display: 'flex',
            justifyContent: 'start',
            padding: '20px 0 30px 0',
            width: '450px',
        }
    }
})
export interface BackNavigateInterface {
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const BackNavigate: React.FC<BackNavigateInterface> = ({onClick}) => {
    const { root } = useStyle();
    return (
        <div onClick={onClick}  className={root}>
            <ArrowBackIosIcon  />
            <Typography variant="subtitle1" >
                Back
            </Typography>
        </div>
    )
}

export default BackNavigate;
