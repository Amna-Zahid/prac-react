import React, {ChangeEvent, FC, useEffect, useRef, useState, KeyboardEvent} from "react";
import {VideoCard} from "material-ui-player";
// @ts-ignore
import VideoThumbnail from 'react-video-thumbnail';

import {
    Button,
    Container,
    Modal,
    MenuItem,
    Fade,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    CircularProgress, Backdrop
} from "@material-ui/core";
import useStyles, {selectProps, ErrorLabel} from "./styles"
import BackNavigate from "components/BackNavigate";
import logo from "assets/logo.svg"
import {ArrowUpward, Done, FiberManualRecord, PlayArrow} from "@material-ui/icons";
import {Autocomplete} from "@material-ui/lab";

import {Controller, FieldError, FieldErrors, SubmitErrorHandler, useForm} from "react-hook-form";
import {IGoalForm, IGoalFormWithImage, ImageActions, schema} from "./form";
import {yupResolver} from "@hookform/resolvers/yup";
import useFileUpload from "hooks/FileUpload";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setGoalForm} from "store/actions/goalActions";

import {AppDispatch, AppState, CurrentGoal} from "store/types";
import useS3FileUpload, {FileError} from "hooks/s3Upload";


const GoalsAdd: FC = () => {
    const { main, navigationHeader, formContainer, thingsContainer,
        modal, modalPaper,
    uploadContainer, uploadCaption, color, autoCompleteInput, iconSelected, uploadPlaceholder, errorText,
        fieldContainer, submitContainer} = useStyles();
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [hasVerticalVideo, setHasVerticalVideo] = useState<boolean>(false);
    const [verticalSrc, setVerticalSrc] = useState<string>('');
    const [horizontalSrc, setHorizontalSrc] = useState<string>('');
    const [hasHorizontalVideo, setHasHorizontalVideo] = useState<boolean>(false);
    const [categoryColor, setCategoryColor] = useState<{color: string, label: string}>({color: '#0d2e6e', label: 'Blue'})
    const imageRef = useRef<null | HTMLElement>(null);
    const [fileError, setFileError] = useState<FileError>({toggle: false, message: ''});
    const [uploadFile, setUploadFile] = useState<string>('');
    const currentGoal = useSelector<AppState, CurrentGoal>(state => state.currentGoal);
    const goalFormData = useSelector<AppState, IGoalFormWithImage>(state => state.updatedGoal);
    const allGoals = useSelector<AppState, string[]>(state => state.goalCategories);
    const {handleUpload, files, clearFiles, uploadError, fileLoader} = useS3FileUpload();
    const [playVideoSrc, setPlayVideoSrc] = useState<string>('');
    const {clearFiles: clearVerticalVideo, files: verticalVideoFiles, handleUpload: handleVerticalUpload, uploadError: verticalError, fileLoader: verticalLoader} = useS3FileUpload('verticalVideo', "video");
    const {clearFiles: clearHorizontalVideo, files: horizontalVideoFiles, handleUpload: handleHorizontalUpload, uploadError: horizontalError, fileLoader: horizontalLoader} = useS3FileUpload('horizontalVideo', "video");
    const history = useHistory();
    const {register, setValue, trigger, handleSubmit, setError, getValues, control, errors} = useForm<IGoalForm>({
        criteriaMode: 'all',
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            category: '',
            horizon: '',
            amount: '',
            targetExplanation: '',
            tobeAchieved: '',
            achievedExplanation: '',
            importance: '',
            importanceExplanation: '',
            description: '',
            thingToConsider1: '',
            thingToConsider2: '',
            thingToConsider3: '',
            isPublished: false,
            hasBorrowed: false,
            MinRepaymentPeriod: 12,
            MaxRepaymentPeriod: 60,
            CategoryColor: categoryColor,
        }

    });

    useEffect(() => {
        setFileError(uploadError)
    }, [uploadError]);


    useEffect(() => {
        if (files && files.length > 0) {
            setFileError({toggle: false, message: ''});
        }
    }, [files]);



    useEffect(() => {
        if(goalFormData) {
            const { achievedExplanation, amount, category, description, horizon,
            importance, importanceExplanation, name, targetExplanation, thingToConsider1,
            thingToConsider2, thingToConsider3, CategoryColor,
            tobeAchieved, hasBorrowed, MinRepaymentPeriod, MaxRepaymentPeriod, isPublished,
            ageGroup20, ageGroup30, ageGroup40, ageGroup50, ageGroup60} = goalFormData;
            setValue('name',   name);
            setValue('CategoryColor', CategoryColor);
            setValue('category',  category);
            setTimeout(() =>   setValue('horizon',  horizon))
            setValue('amount',  amount);
            setValue('targetExplanation',    targetExplanation);
            setValue('MinRepaymentPeriod',    MinRepaymentPeriod === 0 ?  12 : MinRepaymentPeriod);
            setValue('MaxRepaymentPeriod',    MaxRepaymentPeriod === 0 ? 60 : MaxRepaymentPeriod);
            setValue('tobeAchieved',  tobeAchieved);
            setValue('achievedExplanation',  achievedExplanation);
            setTimeout(() =>   setValue('importance',  importance))
            setValue('importanceExplanation', importanceExplanation);
            setValue('description', description);
            setTimeout(() =>   setValue('isPublished',  isPublished))
            if (currentGoal && (files.length === 0 || !files) &&  currentGoal.Images.length > 0) {
                setUploadFile(currentGoal.Images[0].URL);
            }
            setValue('thingToConsider1', thingToConsider1);
            setValue('thingToConsider2', thingToConsider2);
            setValue('thingToConsider3', thingToConsider3);
            setValue('ageGroup20', ageGroup20);
            setValue('ageGroup30', ageGroup30);
            setValue('ageGroup40', ageGroup40);
            setValue('ageGroup50', ageGroup50);
            setValue('ageGroup60', ageGroup60);
            setTimeout(() =>   setValue('hasBorrowed',  (MaxRepaymentPeriod > 0)))

        } else if (currentGoal) {
            const {Name, Category, Horizon, Images,
            Importance, Description, CategoryColor, SumToReach, ToBeAchived, ThingsToConsider, IsPublished, MaxRepaymentPeriod, MinRepaymentPeriod, AgeGroup } = currentGoal;

            setValue('name',   Name);
            if (CategoryColor === 'White') {
                setValue('CategoryColor',  {color: '#FFFFFF', label: 'White'})
            } else {
                setValue('CategoryColor',  {color: '#0d2e6e', label: 'Blue'})
            }
            setValue('category',  Category);
            setTimeout(() =>   setValue('horizon',  Horizon));
            setTimeout(() =>   {
                setValue('isPublished',  IsPublished)
                console.log(getValues('isPublished'))
            });
            if (AgeGroup && AgeGroup.includes("20")) {
                setValue('ageGroup20',  true)
            }
            if (AgeGroup && AgeGroup.includes("30")) {
                setValue('ageGroup30',  true)
            }
            if (AgeGroup && AgeGroup.includes("40")) {
                setValue('ageGroup40',  true)
            }
            if (AgeGroup && AgeGroup.includes("50")) {
                setValue('ageGroup50',  true)
            }
            if (AgeGroup && AgeGroup.includes("60")) {
                setValue('ageGroup60',  true)
            }


            setValue('amount',  SumToReach.Title);
            setValue('MinRepaymentPeriod',    MinRepaymentPeriod === 0 ?  12 : MinRepaymentPeriod);
            setValue('MaxRepaymentPeriod',    MaxRepaymentPeriod === 0 ? 60 : MaxRepaymentPeriod);
            setValue('targetExplanation',    SumToReach.Description);
            setValue('tobeAchieved',  ToBeAchived.Title);
            setValue('achievedExplanation',  ToBeAchived.Description);
            const [_, importanceInput] = Importance.Title.split("-");
            if (importanceInput) {
                setTimeout(() =>   setValue('importance',  importanceInput))
            }
            setValue('importanceExplanation', Importance.Description);
            setValue('description', Description);
            if (Images && Images.length > 0) {
                setUploadFile(Images[0].URL);
                const verticalVideo = Images.find(({Dimension}) => Dimension === 'VideoVertical');
                const horizontalVideo = Images.find(({Dimension}) => Dimension === 'VideoHorizontal');
                if (verticalVideo) {
                    setVerticalSrc(verticalVideo.URL);
                    setHasVerticalVideo(true);
                }
                if (horizontalVideo) {
                    setHorizontalSrc(horizontalVideo.URL);
                    setHasHorizontalVideo(true);
                }


            }
            setValue('thingToConsider1', ThingsToConsider[0] || "");
            setValue('thingToConsider2', ThingsToConsider[1] || "");
            setValue('thingToConsider3', ThingsToConsider[2] || "");
            // setTimeout(() =>   {
                setValue('hasBorrowed',  MaxRepaymentPeriod > 0)

            // });
        } else {
            clearFiles();
            clearHorizontalVideo();
            clearVerticalVideo();
        }
    }, []);
    const onFormError = (errors: FieldErrors<IGoalForm>) => {
        console.log(errors);
        if (!(files && files.length > 0)) {
            setFileError({toggle: true, message: 'Image is required'});
        }
    }
    const onFormSubmit = (formData: IGoalForm) => {
        if (!uploadFile) {
            if (!(files && files.length > 0)) {
                setFileError({toggle: true, message: 'Image is required'});

                imageRef && imageRef.current?.focus();
                return;
            }
        }
        console.log(formData);
        let updatedGoal: IGoalFormWithImage = {Images: [], ...formData};
        if (files && files.length > 0) {
            updatedGoal.Images = [{
                Dimension: "Image",
                URL: files[0].url
            }];
        }
        dispatch(setGoalForm(updatedGoal));
        history.push("/goalTip");

    }
    const onBack = () => {
        history.push("/");
    }
    const onControlChange = ([, data]: any[]) => {
        console.log(data);
        return data;
    }
    const getOpObj = (option: any) => {
        // if (!option._id) option = categories.find(op => op._id === option);
        return option;
    };
    const getOptionLabel = (option: any) => {
        console.log(option);
        return option || '';
    }
    const onCategoryChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        if(allGoals.includes(value)) {
            setError('category', {
                type: "manual",
                message: "Category already exist"
            })
        }
    }
    const onLimitKeyDown = (e: KeyboardEvent<HTMLDivElement> , name: 'MinRepaymentPeriod' | 'MaxRepaymentPeriod') => {
        // const val = parseInt(e.key, 10);
        //
        // const minLimit = Number(getValues(name));
        // if(((e.keyCode === 8) || (e.keyCode === 46 && e.location === 0)) && minLimit <= 9) {
        //     e.preventDefault();
        //     setValue(name, 0);
        //     return false;
        // }
        // if (minLimit === 0 && !isNaN(val)) {
        //     e.preventDefault();
        //     setValue(name, val);
        //     return false;
        // }
        // if(!isNaN(val)) {
        //     setValue(name, Number(minLimit.toString() + val))
        // }

        return true;
    }
    return (
        <Container className={main}>
            <div className={navigationHeader}>
                <BackNavigate onClick={onBack} />
                <img src={logo} alt="logo" />
            </div>
            <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
                <div className={formContainer} >
                    <Typography variant="h3">
                        {currentGoal ? 'Edit': 'Add'} goal details
                    </Typography>

                    <div className={fieldContainer}>
                        <TextField label="Goal category"
                                   onChange={onCategoryChange}
                                   inputRef={register}
                                   error={!!errors.category}
                                   helperText={errors.category ? errors.category.message : ''}
                                   name="category"/>

                        <Controller control={control} name="CategoryColor"
                                    render={({onChange, ...props}) => (
                                        <Autocomplete
                                            limitTags={1}
                                            onChange={(e, data) => onChange(data)}

                                            renderTags={(values) => (
                                                values.map(option => (
                                                    <>
                                                        <span className={color} style={{ backgroundColor: option.color }} />
                                                        <span>{option.label}</span>
                                                    </>
                                                ))
                                            )}
                                            options={[
                                                {color: '#FFFFFF', label: 'White'},
                                                {color: '#0d2e6e', label: 'Blue'}
                                            ]}
                                            disablePortal
                                            renderOption={(option, {selected}) => (
                                                <>
                                                    <Done className={iconSelected}  style={{ visibility: selected ? 'visible' : 'hidden' }} />
                                                    <span className={color} style={{ backgroundColor: option.color }} />
                                                    <span>{option.label}</span>
                                                </>
                                            )}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={({InputProps: {ref}, inputProps}) => (
                                                <TextField className={autoCompleteInput} label="Category color"  InputProps={{startAdornment: <span className={color} style={{ backgroundColor: getValues('CategoryColor')?.color, margin: '0 -8px 0 16px' }} />}}
                                                           disabled ref={ref} inputProps={inputProps}  />
                                            )}
                                            {...props}  />
                                    )} onChange={(data: any) => {console.log(data)}} />

                        <Controller control={control} name="horizon" as={
                            <TextField select  label="Horizon">
                                {['Short', 'Medium', 'Long'].map((item, i) => (<MenuItem key={i} value={item}>{item}</MenuItem>))}
                            </TextField>
                        }
                                    error={!!errors.horizon}
                                    helperText={errors.horizon ? errors.horizon.message : ''}
                                    SelectProps={selectProps}>
                        </Controller>
                        <TextField label="Name guide"
                                   inputRef={register}
                                   error={!!errors.name}
                                   helperText={errors.name ? errors.name.message : ''}
                                   name="name"/>

                        <div className={uploadContainer} >
                            <div className={uploadPlaceholder} >
                                {fileLoader ? <CircularProgress /> :
                                    (files && files.length > 0)  ?
                                    <img alt="goal image" src={files[0].url} /> :
                                    uploadFile ? <img alt="goal image" src={uploadFile} /> :
                                    (
                                    <>
                                        <ArrowUpward style={{color: '#B0B3B9'}}  />
                                        <Typography style={{ fontSize: '12px' }} variant="subtitle2">
                                            upload
                                        </Typography>
                                    </>
                                )}

                            </div>
                            <div className={uploadCaption}>
                                <Typography variant="body2">
                                    Upload goal image
                                </Typography>
                                <label htmlFor="imageUpload">
                                    <input onChange={handleUpload} style={{ visibility: "hidden", position: "absolute" }} type='file' id='imageUpload' />
                                    <Button disabled={fileError.toggle} ref={imageRef} style={{ display: 'flex' }} variant="outlined" size="small" color="primary" component="span">
                                        Upload
                                    </Button>
                                    {fileError.toggle  &&  <ErrorLabel >
                                        {fileError.message}
                                    </ ErrorLabel>}
                                </label>
                            </div>
                        </div>
                        <div className={uploadContainer} >
                            <div className={uploadPlaceholder} >
                                {(verticalVideoFiles && verticalVideoFiles.length > 0)  ?
                                    <PlayArrow style={{fontSize: '50px', cursor: 'pointer'}} onClick={() => {
                                        setOpenModal(() => true);
                                        setPlayVideoSrc(verticalVideoFiles[0].url);
                                    }}  /> :
                                    verticalLoader ? <CircularProgress /> :
                                    hasVerticalVideo ? <PlayArrow style={{fontSize: '50px', cursor: 'pointer'}} onClick={() => {
                                            setPlayVideoSrc(verticalSrc);
                                        setOpenModal(() => true);

                                        }}   />
                                        :
                                    (
                                            <>
                                                <ArrowUpward style={{color: '#B0B3B9'}}  />
                                                <Typography style={{ fontSize: '12px' }} variant="subtitle2">
                                                    upload
                                                </Typography>

                                            </>
                                        )}

                            </div>
                            <div className={uploadCaption}>
                                <Typography variant="body2">
                                    Upload goal vertical video
                                </Typography>
                                <label htmlFor="verticalUpload">
                                    <input onChange={handleVerticalUpload} style={{ visibility: "hidden", position: "absolute" }} type='file' id='verticalUpload' />
                                    <Button disabled={verticalError.toggle}  style={{ display: 'flex' }} variant="outlined" size="small" color="primary" component="span">
                                        Upload
                                    </Button>
                                    {verticalError.toggle  &&  <ErrorLabel >
                                        {verticalError.message}
                                    </ ErrorLabel>}
                                </label>
                            </div>
                        </div>



                        <div className={uploadContainer} >
                            <div className={uploadPlaceholder} >
                                {(horizontalVideoFiles && horizontalVideoFiles.length > 0)  ?
                                    <PlayArrow style={{fontSize: '50px', cursor: 'pointer'}} onClick={() => {
                                        setOpenModal(() => true);
                                        setPlayVideoSrc(horizontalVideoFiles[0].url);
                                    }}  /> :
                                    horizontalLoader ? <CircularProgress /> :
                                    hasHorizontalVideo ? <PlayArrow style={{fontSize: '50px', cursor: 'pointer'}} onClick={() => {
                                            setOpenModal(() => true);
                                            setPlayVideoSrc(horizontalSrc);
                                        }}   /> :
                                        (
                                            <>
                                                <ArrowUpward style={{color: '#B0B3B9'}}  />
                                                <Typography style={{ fontSize: '12px' }} variant="subtitle2">
                                                    upload {horizontalError.toggle }
                                                </Typography>

                                            </>
                                        )}

                            </div>
                            <div className={uploadCaption}>
                                <Typography variant="body2">
                                    Upload goal horizontal video
                                </Typography>
                                <label htmlFor="horizontalUpload">
                                    <input onChange={handleHorizontalUpload} style={{ visibility: "hidden", position: "absolute" }} type='file' id='horizontalUpload' />
                                    <Button disabled={horizontalError.toggle}  style={{ display: 'flex' }} variant="outlined" size="small" color="primary" component="span">
                                        Upload
                                    </Button>
                                    {horizontalError.toggle  &&  <ErrorLabel >
                                        {horizontalError.message}
                                    </ ErrorLabel>}
                                </label>
                            </div>
                        </div>


                        <Typography  variant="h3" >
                            Target amount guide
                        </Typography>
                        <TextField label="Target amount guide"
                                   inputRef={register}
                                   error={!!errors.amount}
                                   helperText={errors.amount ? errors.amount.message : ''}
                                   name="amount"
                        />
                        <TextField rows={5} rowsMax={5} multiline
                                   error={!!errors.targetExplanation}
                                   helperText={errors.targetExplanation ? errors.targetExplanation.message : ''}
                                   label="Explanation" inputRef={register} name="targetExplanation" />

                        <Typography  variant="h3" >
                            Repayment period
                        </Typography>
                        <TextField label="Minimum repayment period"
                                   type='number'
                                   inputRef={register}
                                   error={!!errors.MinRepaymentPeriod}
                                   disabled={!getValues('hasBorrowed')}
                                   helperText={errors.MinRepaymentPeriod ? errors.MinRepaymentPeriod.message : ''}
                                   name="MinRepaymentPeriod"
                                   onChange={(e) => {
                                       trigger('MinRepaymentPeriod').then(() => {});
                                   }}
                                   onKeyDown={(e) => {onLimitKeyDown(e, 'MinRepaymentPeriod')}}
                        />
                        <TextField
                            disabled={!getValues('hasBorrowed')}
                            type='number'
                                    onChange={(e) => {
                                        trigger('MaxRepaymentPeriod').then(() => {});
                                    }}
                                    onKeyDown={(e) => {onLimitKeyDown(e, 'MaxRepaymentPeriod')}}
                                   error={!!errors.MaxRepaymentPeriod}
                                   helperText={errors.MaxRepaymentPeriod ? errors.MaxRepaymentPeriod.message : ''}
                                   label="Maximum borrowed amount" inputRef={register} name="MaxRepaymentPeriod" />

                        <FormControlLabel
                            // checked={getValues('isPublished')}
                            control={<Controller onChange={() => {
                                debugger;
                                console.log(getValues('hasBorrowed'));

                            }}  name="hasBorrowed" control={control} value={true}  defaultValue={false}
                                                 render={(
                                                     props,
                                                     { invalid, isTouched, isDirty }
                                                 ) => (
                                                     <Checkbox
                                                         onBlur={props.onBlur}
                                                         onChange={(e) => {
                                                             props.onChange(e.target.checked);
                                                             trigger('MinRepaymentPeriod').then(() => {});
                                                             trigger('MaxRepaymentPeriod').then(() => {});
                                                         }}
                                                         checked={props.value}
                                                         inputRef={props.ref}
                                                     />
                                                 )} />  }
                            label={"Enable borrowing"} />

                        <Typography  variant="h3" >
                             To be achieved by guide
                        </Typography>
                        <Controller control={control} name="tobeAchieved" as={
                            <TextField select  label="To be achieved by guide">
                                {Array.from({length: 20}).map((item, i) => (<MenuItem key={i} value={`In ${i + 1} Year`}>{`In ${i + 1} Year`}</MenuItem>))}
                            </TextField>
                        }
                                    error={!!errors.importance}
                                    helperText={errors.importance ? errors.importance.message : ''}
                                    SelectProps={selectProps}>
                        </Controller>
                        <TextField rows={5} rowsMax={5}
                                   error={!!errors.achievedExplanation}
                                   helperText={errors.achievedExplanation ? errors.achievedExplanation.message : ''}
                                   multiline label="Explanation" inputRef={register} name="achievedExplanation" />
                        <Typography  variant="h3" >
                            Importance guide
                        </Typography>
                        <Controller control={control} name="importance" as={
                            <TextField select  label="Importance guide">
                                {['None','Very high','High', 'Medium', 'Low', 'Very low'].map((item, i) => (<MenuItem key={i} value={item}>{item}</MenuItem>))}
                            </TextField>
                        }
                                    error={!!errors.importance}
                                    helperText={errors.importance ? errors.importance.message : ''}
                                    SelectProps={selectProps}>
                        </Controller>
                        <TextField rows={5} rowsMax={5}
                                   error={!!errors.importanceExplanation}
                                   helperText={errors.importanceExplanation ? errors.importanceExplanation.message : ''}
                                   multiline label="Explanation" inputRef={register} name="importanceExplanation" />
                        <Typography  variant="h3" >
                           Goal description
                        </Typography>
                        <TextField rows={5} rowsMax={5} multiline
                                   error={!!errors.description}
                                   helperText={errors.description ? errors.description.message : ''}
                                   label="Consideration" inputRef={register} name="description" />
                        <Typography  variant="h3" >
                            Things to consider
                        </Typography>
                        <div className={thingsContainer}>
                            <FiberManualRecord />
                            <TextField  label="Consideration" inputRef={register} name="thingToConsider1"
                                        error={!!errors.thingToConsider1}
                                        helperText={errors.thingToConsider1 ? errors.thingToConsider1.message : ''} />
                        </div>
                        <div className={thingsContainer}>
                            <FiberManualRecord />
                            <TextField  label="Consideration" inputRef={register} name="thingToConsider2"
                                        error={!!errors.thingToConsider2}
                                        helperText={errors.thingToConsider2 ? errors.thingToConsider2.message : ''}/>
                        </div>
                        <div className={thingsContainer}>
                            <FiberManualRecord />
                            <TextField  label="Consideration" inputRef={register} name="thingToConsider3"
                                        error={!!errors.thingToConsider3}
                                        helperText={errors.thingToConsider3 ? errors.thingToConsider3.message : ''}
                            />
                        </div>
                        <Typography  variant="h3" >
                            Age groups
                        </Typography>
                        <FormControlLabel
                            // checked={getValues('isPublished')}
                            control={<Controller onChange={() => {console.log(getValues('ageGroup20'))}}  name="ageGroup20" control={control} value={true}  defaultValue={false}
                                                 render={(
                                                     { onChange, onBlur, value, name, ref },
                                                     { invalid, isTouched, isDirty }
                                                 ) => (
                                                     <Checkbox
                                                         onBlur={onBlur}
                                                         onChange={(e) => onChange(e.target.checked)}
                                                         checked={value}
                                                         inputRef={ref}
                                                     />
                                                 )} />  }
                            label={"20"} />
                        <FormControlLabel
                            // checked={getValues('isPublished')}
                            control={<Controller onChange={() => {console.log(getValues('ageGroup30'))}}  name="ageGroup30" control={control} value={true}  defaultValue={false}
                                                 render={(
                                                     { onChange, onBlur, value, name, ref },
                                                     { invalid, isTouched, isDirty }
                                                 ) => (
                                                     <Checkbox
                                                         onBlur={onBlur}
                                                         onChange={(e) => onChange(e.target.checked)}
                                                         checked={value}
                                                         inputRef={ref}
                                                     />
                                                 )} />  }
                            label={"30"} />
                        <FormControlLabel
                            // checked={getValues('isPublished')}
                            control={<Controller onChange={() => {console.log(getValues('ageGroup40'))}}  name="ageGroup40" control={control} value={true}  defaultValue={false}
                                                 render={(
                                                     { onChange, onBlur, value, name, ref },
                                                     { invalid, isTouched, isDirty }
                                                 ) => (
                                                     <Checkbox
                                                         onBlur={onBlur}
                                                         onChange={(e) => onChange(e.target.checked)}
                                                         checked={value}
                                                         inputRef={ref}
                                                     />
                                                 )} />  }
                            label={"40"} />
                        <FormControlLabel
                            // checked={getValues('isPublished')}
                            control={<Controller onChange={() => {console.log(getValues('ageGroup50'))}}  name="ageGroup50" control={control} value={true}  defaultValue={false}
                                                 render={(
                                                     { onChange, onBlur, value, name, ref },
                                                     { invalid, isTouched, isDirty }
                                                 ) => (
                                                     <Checkbox
                                                         onBlur={onBlur}
                                                         onChange={(e) => onChange(e.target.checked)}
                                                         checked={value}
                                                         inputRef={ref}
                                                     />
                                                 )} />  }
                            label={"50"} />
                        <FormControlLabel
                            // checked={getValues('isPublished')}
                            control={<Controller onChange={() => {console.log(getValues('ageGroup60'))}}  name="ageGroup60" control={control} value={true}  defaultValue={false}
                                                 render={(
                                                     { onChange, onBlur, value, name, ref },
                                                     { invalid, isTouched, isDirty }
                                                 ) => (
                                                     <Checkbox
                                                         onBlur={onBlur}
                                                         onChange={(e) => onChange(e.target.checked)}
                                                         checked={value}
                                                         inputRef={ref}
                                                     />
                                                 )} />  }
                            label={"60+"} />

                        {getValues('isPublished')}
                        <FormControlLabel
                            // checked={getValues('isPublished')}
                            control={<Controller onChange={() => {console.log(getValues('isPublished'))}}  name="isPublished" control={control} value={true}  defaultValue={false}
                                                 render={(
                                                     { onChange, onBlur, value, name, ref },
                                                     { invalid, isTouched, isDirty }
                                                 ) => (
                                                     <Checkbox
                                                         onBlur={onBlur}
                                                         onChange={(e) => onChange(e.target.checked)}
                                                         checked={value}
                                                         inputRef={ref}
                                                     />
                                                 )} />  }
                               label={"Publish current goal"} />

                    </div>
                </div>
                <div className={submitContainer}>
                    <Button disabled={fileLoader || verticalLoader || horizontalLoader} type="submit" variant="contained" size="small" color="primary">
                        Next step
                    </Button>
                </div>
            </form>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={modal}
                open={openModal}
                closeAfterTransition
                onClose={() => setOpenModal(false)}
                disablePortal={false}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className={modalPaper}>
                         <VideoCard  autoplay={true}  src={playVideoSrc}/>
                    </div>
                </Fade>
            </Modal>
        </Container>
    )
};

export default GoalsAdd;

