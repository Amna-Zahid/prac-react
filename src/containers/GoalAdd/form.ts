import {boolean, number, object, string, ref} from "yup";
import {ImageInput} from "api/types";
import Reference from "yup/lib/Reference";

export interface IGoalForm {
    name: string;
    category: string;
    horizon: string;
    amount: string;
    targetExplanation: string;
    tobeAchieved: string;
    achievedExplanation: string;
    hasBorrowed: boolean;
    MinRepaymentPeriod: number;
    MaxRepaymentPeriod: number;
    importance: string;
    importanceExplanation: string;
    description: string;
    thingToConsider1: string;
    thingToConsider2: string;
    thingToConsider3: string;
    isPublished: boolean;
    ageGroup20: boolean;
    ageGroup30: boolean;
    ageGroup40: boolean;
    ageGroup50: boolean;
    ageGroup60: boolean;
    CategoryColor: {color: string, label: string};
}
export enum ImageActions {
    add = "add",
    update = "update",
    delete = "delete"
}



export type IGoalFormWithImage = (IGoalForm & {Images: ImageInput[]}) | null;

// export interface IGoalFormWithImage extends IGoalForm {
//     ImageBase64: ImageInput[];
// }

const schema  = object().shape({
    name: string().required('Name is required'),
    category: string().nullable().required('Category name is required'),
    horizon: string().required('Horizon is required'),
    description: string().required('Description is required'),
    amount: string(),
    tobeAchieved: string(),
    achievedExplanation: string().required('To be achieved explanation document is required'),
    targetExplanation: string().required('To be achieved explanation document is required'),
    importance: string(),
    importanceExplanation: string().required('importance  is required'),
    thingToConsider1: string().required('field is required'),
    thingToConsider2: string().required('field is required'),
    thingToConsider3: string().required('field is required'),
    hasBorrowed: boolean().required(),
    MinRepaymentPeriod: number().transform(value => {
        console.log(value);
        return isNaN(value) ? "0" : value
    })
        .when('hasBorrowed',{
        is: true,
        then: number().transform(value => {
            console.log(value);
            return isNaN(value) ? undefined : value
        }).required('Minimum repayment period limit is required')
            .integer('must be an integer')
            .min(12, 'Minimum repayment period limit must be at least 12 month')
            .max(ref('MaxRepaymentPeriod') as Reference<number>, 'Must be less than or equal to maximum repayment period limit')
            .max(60, 'Minimum repayment period limit must be at most 60 month')
    }),
    MaxRepaymentPeriod: number().transform(value => {
        console.log(value);
        return isNaN(value) ? undefined : value
    }).when('hasBorrowed',{
        is: true,
        then: number()
            .transform(value => {
                console.log(value);
                return isNaN(value) ? undefined : value
            })
            .required('Maximum repayment period limit is required')
            .integer('Maximum repayment period Must be a whole number')
            .min(12, 'Maximum repayment period limit must be at least 12 month')
            .min(ref('MinRepaymentPeriod') as Reference<number>, 'Must be more than or equal to minimum repayment period limit')
            .max(60, 'Maximum repayment period limit must be at most 60 month')
    }),

    isPublished: boolean(),
    ageGroup20: boolean(),
    ageGroup30: boolean(),
    ageGroup40: boolean(),
    ageGroup50: boolean(),
    ageGroup60: boolean(),
    CategoryColor: object().shape({
        color: string(),
        label: string()
    })
});

export {
    schema,
}
