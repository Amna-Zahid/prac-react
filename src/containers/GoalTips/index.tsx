import React, {FC, useEffect, useState} from "react";
import useStyles from "./styles"
import {Button, Container, Typography} from "@material-ui/core";
import {SortableTipContainer, TipCardData} from "components/TipCard";
import {SortEndHandler} from "react-sortable-hoc";
import arrayMove from "array-move";
import {v4 as getId} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppState, CurrentGoal} from "../../store/types";
import BackNavigate from "../../components/BackNavigate";
import logo from "../../assets/logo.svg";
import {useHistory} from "react-router";
import {AgeTypes, GoalPost, ImageInput, ITileDescription, NewGoalPost, NewSortIndexes} from "../../api/types";
import {IGoalFormWithImage, ImageActions} from "../GoalAdd/form";
import {postNewGoal, putGoal} from "api/GoalsApi";
import Loading from "../../components/Loading";
import {setCurrentGoal, setGoalForm} from "../../store/actions/goalActions";
import useFileUpload from "../../hooks/FileUpload";
import useS3FileUpload from "../../hooks/s3Upload";

export type TipData = TipCardData & {editable? :boolean, id?: string};

const GoalTips: FC = () => {
    const currentGoal = useSelector<AppState, CurrentGoal>(state => state.currentGoal);
    const goalFormData = useSelector<AppState, IGoalFormWithImage>(state => state.updatedGoal);
    const newSortIndices = useSelector<AppState, NewSortIndexes>(state => state.newSortIndexes);
    const [loading, setLoading] = useState<boolean>(false);
    const {files, clearFiles} = useS3FileUpload();
    const {files: verticalVideos, clearFiles: clearVerticalVideos} = useS3FileUpload('verticalVideo', 'video');
    const {files: horizontalVideos, clearFiles: clearHorizontalVideos} = useS3FileUpload('horizontalVideo', 'video');

    const {root, tipContainerHeader, navigationHeader, submitContainer } = useStyles();
    const [tipsData, setTipsData] = useState<TipData[]>([]);
    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (currentGoal) {
            const checkLists = currentGoal.ChecklistItems.map<TipData>(({Title: title, Description: explanation}) => ({id: getId(), title, explanation}));
            setTipsData(checkLists);
        }
    }, []);
    const [addTipToggle, setAddTipToggle] = useState<boolean>(false);
    const onCardEdit = (i: number, editable: boolean) => {
        const newTips = tipsData.map((item, index) => (
            index !== i ? item : {...item, editable}
        ));
        setTipsData(newTips);
    }
    const onTipSave = (i: number, tipData: TipCardData, id: string) => {
        if (id === 'newTip') {
            id = getId();
            setAddTipToggle(false);
        }
        const newTips = tipsData.map((item, index) => (
            index !== i ? item : {id, ...tipData}
        ));
        setTipsData(newTips);
    };
    const onTipRemove = (i: number) => {
        const newTips = tipsData.filter((item, index) => i !== index );
        setTipsData(newTips);
    }
    const onCancel = (i: number, id: string) => {
        if(id === "newTip") {
           setAddTipToggle(false);
           onTipRemove(i);
        } else {
            onCardEdit(i, false)
        }
    }
    const onNewTipCancel = () => {
        setAddTipToggle(false);
    }
    const onNewTipSave = (tipData: TipCardData) => {
        const newTips = [tipData, ...tipsData];
        setTipsData(newTips);
        setAddTipToggle(false);
    }
    const onSortEndTips: SortEndHandler = ({oldIndex, newIndex}) => {
        setTipsData(oldItems => arrayMove(oldItems, oldIndex, newIndex));
    }
    const onNewTip = () => {
        setAddTipToggle(true);
        const newTip: TipData = {
            explanation: '',
            editable: true,
            title: '',
            id: 'newTip'
        }
        setTipsData([newTip, ...tipsData]);
    }
    const onBack = () => {
        history.push("/goalsAdd");
    }
    const submitGoal = async () => {
        if (goalFormData && currentGoal) {
            let {GoalId, SortId, Images: currentImages} = currentGoal;
            const {category: Category,  description: Description,
            horizon: Horizon, hasBorrowed, MinRepaymentPeriod, MaxRepaymentPeriod, importance, importanceExplanation,
            name: Name, amount, targetExplanation, thingToConsider1,
            thingToConsider2, thingToConsider3, CategoryColor, tobeAchieved, achievedExplanation, isPublished,
            ageGroup20, ageGroup30, ageGroup40, ageGroup50, ageGroup60} = goalFormData;

            if (Horizon !== currentGoal.Horizon || (!currentGoal.IsPublished && isPublished)) {
                if (Horizon === 'Short') {
                    SortId = newSortIndices.short;
                } else if (Horizon === 'Medium') {
                    SortId = newSortIndices.medium;
                } else {
                    SortId = newSortIndices.long;
                }
            } else {
                SortId = 0
            }
            const AgeGroup: AgeTypes[] = [];
            if (ageGroup20) {
                AgeGroup.push("20");
            }
            if (ageGroup30) {
                AgeGroup.push("30");
            }
            if (ageGroup40) {
                AgeGroup.push("40");
            }
            if (ageGroup50) {
                AgeGroup.push("50");
            }
            if (ageGroup60) {
                AgeGroup.push("60");
            }
            let Images: ImageInput[] = files.length > 0 ? [{
                Dimension: 'Image',
                URL: files[0].url
            }] : [{
                Dimension: "Image",
                URL: currentImages[0].URL
            }];
            const vertical = currentImages.find(({Dimension}) => Dimension === 'VideoVertical');
            const horizontal = currentImages.find(({Dimension}) => Dimension === 'VideoHorizontal');
            if (verticalVideos && verticalVideos.length > 0) {
                Images = [...Images, {
                    Dimension: 'VideoVertical',
                    URL: verticalVideos[0].url
                }]
            } else {
                if (vertical) {
                    Images = [...Images, vertical]
                }
            }
            if (horizontalVideos && horizontalVideos.length > 0) {
                Images = [...Images, {
                    Dimension: 'VideoHorizontal',
                    URL: horizontalVideos[0].url
                }]
            } else {
                if (horizontal) {
                    Images = [...Images, horizontal]
                }
            }
            const goalData: GoalPost = {
                Category,
                ChecklistItems: tipsData.map<ITileDescription>(({title: Title, explanation: Description}) => ({Title, Description}) ),
                Description,
                GoalId,
                MinRepaymentPeriod: hasBorrowed ? MinRepaymentPeriod : 0,
                MaxRepaymentPeriod: hasBorrowed ? MaxRepaymentPeriod : 0,
                Horizon,
                Images,
                Importance: {Title: '1-'+importance, Description: importanceExplanation},
                Name,
                SortId,
                SumToReach: {Title: amount, Description: targetExplanation},
                ThingsToConsider: [thingToConsider1, thingToConsider2, thingToConsider3],
                ToBeAchived: {Title: tobeAchieved, Description: achievedExplanation},
                IsPublished: isPublished,
                CategoryColor: CategoryColor.label,
                IsArchived: false,
                AgeGroup
            }
            try {
                setLoading(true);
                const {message, error} = await putGoal(goalData);
                setLoading(false);
                if (error) {
                    console.log(message);
                } else {
                    dispatch(setGoalForm(null));
                    dispatch(setCurrentGoal(null));
                    clearFiles();
                    clearVerticalVideos();
                    clearHorizontalVideos();
                    history.push("/");
                }


            } catch (e) {
                setLoading(false);
            }
        } else if (goalFormData) {
            let Images: ImageInput[] = files.length > 0 ? [{
                Dimension: 'Image',
                URL: files[0].url
            }] : [];
            if (verticalVideos && verticalVideos.length > 0) {
                Images = [...Images, {
                    Dimension: 'VideoVertical',
                    URL: verticalVideos[0].url
                }]
            }
            if (horizontalVideos && horizontalVideos.length > 0) {
                Images = [...Images, {
                    Dimension: 'VideoHorizontal',
                    URL: horizontalVideos[0].url
                }]
            }
            const {category: Category, description: Description,
                horizon: Horizon, MinRepaymentPeriod, hasBorrowed, MaxRepaymentPeriod, importance, importanceExplanation,
                name: Name, amount, targetExplanation, thingToConsider1,
                thingToConsider2, thingToConsider3, CategoryColor, tobeAchieved, achievedExplanation, isPublished,
            ageGroup20, ageGroup30, ageGroup40, ageGroup50, ageGroup60} = goalFormData;
            const AgeGroup: AgeTypes[] = [];
            if (ageGroup20) {
                AgeGroup.push("20");
            }
            if (ageGroup30) {
                AgeGroup.push("30");
            }
            if (ageGroup40) {
                AgeGroup.push("40");
            }
            if (ageGroup50) {
                AgeGroup.push("50");
            }
            if (ageGroup60) {
                AgeGroup.push("60");
            }
            let SortId = 0;
            if (Horizon === 'Short') {
                SortId = newSortIndices.short;
            } else if (Horizon === 'Medium') {
                SortId = newSortIndices.medium;
            } else {
                SortId = newSortIndices.long;
            }
            const newGoal: NewGoalPost = {
                Category,
                ChecklistItems: tipsData.map<ITileDescription>(({title: Title, explanation: Description}) => ({Title, Description}) ),
                Description,
                SortId,
                Horizon,
                MinRepaymentPeriod: hasBorrowed ? MinRepaymentPeriod : 0,
                MaxRepaymentPeriod: hasBorrowed ? MaxRepaymentPeriod : 0,
                Name,
                Importance: {Title: importance, Description: importanceExplanation},
                SumToReach: {Title: amount, Description: targetExplanation},
                ToBeAchived: {Title: tobeAchieved, Description: achievedExplanation},
                Images,
                CategoryColor: CategoryColor.label,
                IsArchived: false,
                IsPublished: isPublished,
                ThingsToConsider: [thingToConsider1, thingToConsider2, thingToConsider3],
                AgeGroup,
            }
            try {
                setLoading(true);
                const {message, error} = await postNewGoal(newGoal);
                setLoading(false);
                if (error) {
                    console.log(message);
                } else {
                    dispatch(setGoalForm(null));
                    dispatch(setCurrentGoal(null));
                    clearFiles();

                    history.push("/");
                }

            } catch (e) {
                setLoading(false);
            }
        }

    }
    return (
        <Container style={{padding: 0}}>
            {loading && <Loading />}
            <div className={navigationHeader}>
                <BackNavigate onClick={onBack} />
                <img src={logo} alt="logo" />
            </div>
            <div className={root}>
                <div className={tipContainerHeader}>
                    <div>
                        <Typography variant="h2">
                            Goal checklist items
                        </Typography>
                        <Typography variant="caption">
                            Add item or reorder them
                        </Typography>
                    </div>


                    <Button disabled={addTipToggle}  onClick={onNewTip}  variant="contained" size="medium" color="primary">
                        Add item
                    </Button>
                </div>

                {/*{addTipToggle && <TipCard onTipRemove={() => {}} onEdit={() => {}} onCancel={onNewTipCancel} onSave={onNewTipSave}  editable={true} cardData={{explanation: '', title: ''}} />}*/}

                <SortableTipContainer  distance={1} lockAxis='y' axis="y" onSortEnd={onSortEndTips} items={tipsData} onEdit={onCardEdit} onTipSave={onTipSave} onRemove={onTipRemove} onCancel={onCancel} />

                {/*{tipsData.map((item, index) => <TipCard onTipRemove={() => {onTipRemove(index)}} onSave={(tipData) => {onTipSave(index, tipData)}} onCancel={() => onCardEdit(index, false)} key={index} onEdit={() => {onCardEdit(index, true)}} editable={!!item.editable} cardData={item} />)}*/}
            </div>
            <div className={submitContainer}>
                <Button onClick={submitGoal} type="submit" variant="contained" size="small" color="primary">
                    Save this preset goal
                </Button>
            </div>
        </Container>

    )
}

export default GoalTips;
