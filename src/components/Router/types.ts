import {RouteProps} from "react-router-dom";
export interface RouteType extends RouteProps {
    path?: string;
    isProtected?: boolean;
    loginURL?: string;
}
