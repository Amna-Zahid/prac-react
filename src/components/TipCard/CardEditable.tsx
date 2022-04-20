import React, {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, makeStyles, TextField} from "@material-ui/core";
import {TipCardData} from "./index";
import {object, string} from "yup";

interface CardEditableProps {
    cardData: TipCardData;
    onCancel: () => void;
    onSave: (tipData: TipCardData) => void;
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
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '15px 0 0',
        gap: 15,
        '& .MuiButton-root': {
            minWidth: 110
        }
    },
});

const schema = object().shape({
    title: string().required('Title is required'),
    explanation: string().required('Explanation is required'),
})

const TipCardEditable: FC<CardEditableProps> = ({cardData, onCancel, onSave}) => {
    const {tipCard, buttonContainer, inputContainer} = useStyles();
    const {register, handleSubmit, errors} = useForm<TipCardData>({
        criteriaMode: 'all',
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: cardData
    });
    const onFormSubmit = (formData: TipCardData) => {
        onSave(formData);
    }
    const onTipCancel = () => {
        onCancel();
    }
    return (
        <div  className={tipCard}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className={inputContainer}>
                    <TextField className="clickable"
                        inputRef={register}
                        error={!!errors.title}
                        helperText={errors.title ? errors.title.message : ''}
                        name="title"
                        label="Checklist item" />
                    <TextField
                        className="clickable"
                        inputRef={register}
                        error={!!errors.explanation}
                        helperText={errors.explanation ? errors.explanation.message : ''}
                        name="explanation"
                        rows={5} rowsMax={5} multiline label="Explanation"  />
                </div>
                <div className={buttonContainer}>
                    <Button className="clickable" type="submit" variant="contained" size="small" color="primary">
                        Save
                    </Button>
                    <Button className="clickable" onClick={onTipCancel}  variant="outlined" size="small" color="primary">
                        Cancel
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default TipCardEditable;
