import {IEmptyResponse} from "../types";
import httpClient from "api";


export const postTermsAndCondition = (Terms: string): Promise<IEmptyResponse> => (
    httpClient.post('terms-conditions', {Terms: Terms.replaceAll('<br>', '')}).then(({data}) => data)
)
export const getTermsAndCondition = (): Promise<IEmptyResponse> => (
    httpClient.get('terms-conditions').then(({data}) => data)
)

export const postPrivacyAndPolicy = (Privacy: string): Promise<IEmptyResponse> => (
    httpClient.post('privacy-policy', {Privacy: Privacy.replaceAll('<br>', '')}).then(({data}) => data)
)
export const getPrivacyAndPolicy = (): Promise<IEmptyResponse> => (
    httpClient.get('privacy-policy').then(({data}) => data)
)


