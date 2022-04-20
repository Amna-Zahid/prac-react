import React, {FC, useState} from "react";
import {makeStyles, Typography} from "@material-ui/core";
import {EditIcon} from "../icons";
import {DeleteForeverSharp} from "@material-ui/icons";
import {TipCardData} from "./index";

interface CardNonEditableProps {
    cardData: TipCardData;
    onEdit: () => void;
    onRemove: () => void;
}


const useStyles = makeStyles({
    tipCard: {
        backgroundColor: '#FFF',
        boxShadow: '0 1px 0 rgb(9 30 66 / 25%)',
        borderRadius: 4,
        marginBottom: 8,
        padding: 15,
        minHeight: 60,
        '& .MuiTypography-body2': {
            color: '#94979F'
        },
        '& .MuiTypography-h5': {
            color: '#0d2e6e',
            lineHeight: 2
        }
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    readMore: {
        fontSize: '0.875rem',
        lineHeight: 1.43,
        fontWeight: 400,
        letterSpacing: '0.01071em',
        textDecoration: 'underline',
        color: '#636363',
        cursor: 'pointer',
    },
    iconsContainer: {
        '& .MuiSvgIcon-root': {
            cursor: 'pointer'
        }
    }
});

const TipCardNonEditable: FC<CardNonEditableProps> = ({cardData, onEdit, onRemove}) => {
    const {tipCard, titleContainer, iconsContainer, readMore} = useStyles();
    const [toggleReadMore, setToggleReadMore] = useState<boolean>(true);


    return (
        <div  className={tipCard}>
            <div className={titleContainer}>
                <Typography variant="h5">
                    {cardData.title}
                </Typography>
                <div className={iconsContainer}>
                    <EditIcon className="clickable" onClick={onEdit} />
                    <DeleteForeverSharp className="clickable" style={{color: '#ee4b63'}} onClick={onRemove} />
                </div>
            </div>
            <Typography variant="body2" style={{whiteSpace: 'pre-line'}}>
                {(cardData.explanation || "").length > 650 ? (toggleReadMore ?
                    (
                        <>
                        {cardData.explanation.slice(0, 600)}...
                            <Typography className={readMore} variant="caption" onClick={() => {setToggleReadMore(false)}}>Read More</Typography>
                        </>
                    ):
                    (
                        <>
                            {cardData.explanation}
                            <Typography className={readMore} variant="caption" onClick={() => {setToggleReadMore(true)}}>Read Less</Typography>
                        </>
                    )) :
                    cardData.explanation }
            </Typography>
        </div>
    )
};

export default TipCardNonEditable;
