import {IResponse} from "../index";
import {string} from "yup";
import {ImageActions} from "../../containers/GoalAdd/form";
export interface ITileDescription {
    Title: string;
    Description: string;
}
export type AgeTypes = "20" | "30" | "40" | "50" | "60";
export interface BasicGoal {
    SortId: number;
    Category: string;
    Horizon: string;
    MinRepaymentPeriod: number;
    MaxRepaymentPeriod: number;
    CategoryColor: string;
    Name: string;
    IsPublished: boolean;
    SumToReach: ITileDescription;
    ToBeAchived: ITileDescription;
    Importance: ITileDescription;
    Description: string;
    ChecklistItems: ITileDescription[];
    ThingsToConsider: string[];
    AgeGroup: AgeTypes[];
}
export interface GoalTemplate extends BasicGoal{
    GoalId: string;
}

export interface ImageInput {
    URL: string;
    Dimension: "Image" | "VideoVertical" | "VideoHorizontal";
}

export interface GoalPost extends GoalTemplate {
    Images: ImageInput[];
    IsArchived: boolean;
}
export interface NewGoalPost extends BasicGoal {
    Images: ImageInput[];
    IsArchived: boolean;
}

export interface SortItemBody {
    GoalId: string;
    SortId: number;
}

export interface IGoalTemplate extends GoalTemplate{
    index?: number;
    SK: string;
    Images: ImageInput[];

}



export interface IGoalTemplateResponse {
    GoalTemplates: IGoalTemplate[];
}
export interface ICategorizedGoals {
    short: IGoalTemplate[];
    medium: IGoalTemplate[];
    long: IGoalTemplate[];
}
export interface GoalsOrderIds {
    short: number[];
    medium: number[];
    long: number[];
}
export type NewSortIndexes = {short: number, medium: number, long: number}
export type getGoalResponse = { categorizedGoals: ICategorizedGoals} & {newSortIndex: NewSortIndexes}

export type IGetGoalResponse = IResponse<IGoalTemplateResponse>;
export type ISortRequestBody = {Data: SortItemBody[]}
export type IEmptyResponse = IResponse<string>;
export type ISingedUrlResponse = IResponse<{signedRequest: string, url: string, filename: string}>
