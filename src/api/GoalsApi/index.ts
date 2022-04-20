
import httpClient, {} from 'api';
import axios from "axios";
import {
    IGetGoalResponse,
    ICategorizedGoals,
    IGoalTemplate,
    IEmptyResponse,
    GoalPost,
    getGoalResponse,
    NewGoalPost, ISortRequestBody, ISingedUrlResponse
} from "api/types";


const sortedIndex = (array: IGoalTemplate[], sortId: number): number => {
    let low = 0, high = array.length;

    while (low < high) {
        let mid = (low + high) >>> 1;
        if (array[mid].SortId < sortId) low = mid + 1;
        else high = mid;
    }
    return low;
}

export const putGoal = (data: GoalPost): Promise<IEmptyResponse> => {
    return httpClient.put('goal-templates', {...data, IsPublished: data.IsPublished ? 1 : 0, IsArchived: 0});
}
export const postNewGoal = (data: NewGoalPost): Promise<IEmptyResponse> => {
    return httpClient.post('goal-templates', {...data, IsPublished: data.IsPublished ? 1 : 0, IsArchived: 0});
}

export const sortGoals = (data: ISortRequestBody): Promise<IEmptyResponse> => {
    return httpClient.post('goal-templates-sort', data)
}

export const getSignedUrl = (contentType: string): Promise<ISingedUrlResponse> => {
    return httpClient.get(`upload-temp-image?contentType=${contentType}`).then(data => data.data);
}

export const putSignedAsset = (signedUrl: string, body: any): Promise<IEmptyResponse> => {
    return axios.put(signedUrl, {body});
}



// const getGoals = (): Promise<IGetGoalResponse> => {
export const getGoals = (): Promise<getGoalResponse> => {
    return  httpClient.get<IGetGoalResponse>('all-goal-templates')
        .then(({ data: {data: {  GoalTemplates: goalTemplates }, error}}): getGoalResponse => {
            const newSortIndex = {short: 1, medium: 1, long: 1};
            const categorizedGoals =  goalTemplates
                .reduce<ICategorizedGoals>((acc, current) => {
                    current.IsPublished = !!current.IsPublished;
                    if(current.Horizon === 'Short') {
                        if (current.SortId >= newSortIndex.short) {
                            newSortIndex.short = current.SortId + 1;
                        }
                        acc.short.splice(sortedIndex(acc.short, current.SortId), 0, current);
                    } else if (current.Horizon === 'Medium') {
                        if (current.SortId >= newSortIndex.medium) {
                            newSortIndex.medium = current.SortId + 1;
                        }
                        acc.medium.splice(sortedIndex(acc.medium, current.SortId), 0, current);
                    } else {
                        if (current.SortId >= newSortIndex.long) {
                            newSortIndex.long = current.SortId + 1;
                        }
                        acc.long.splice(sortedIndex(acc.long, current.SortId), 0, current);
                    }
                    return acc;
                }, {short: [], medium: [], long: []});
            return {categorizedGoals, newSortIndex}
        })
}


