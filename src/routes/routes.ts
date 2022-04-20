import { RouteType } from "components/Router/types";
import { lazy } from "react";


const HomeScreen = lazy(() => import("containers/Home"));
const GoalsAddScreen = lazy(() => import("containers/GoalAdd"));
const GoalTipScreen = lazy(() => import("containers/GoalTips"));
const PolicyScreen = lazy(() => import("containers/Policy"));
const TermsScreen = lazy(() => import("containers/Policy/terms"))

const routes: RouteType[] = [
    {
        path: "/",
        component: HomeScreen,
        exact: true,
        isProtected: false
    },
    {
        path: "/goalsAdd",
        component: GoalsAddScreen,
        exact: true,
        isProtected: false
    },
    {
        path: "/goalTip",
        component: GoalTipScreen,
        exact: true,
        isProtected: false
    },
    {
        path: "/policy",
        component: PolicyScreen,
        exact: true,
        isProtected: false
    },
    {
        path: "/terms",
        component: TermsScreen,
        exact: true,
        isProtected: false
    }
]

export default routes;
