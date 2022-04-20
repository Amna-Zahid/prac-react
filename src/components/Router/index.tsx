import React from "react"
import {RouteType} from "./types";
import Public from "./Public";

const Router = ({ isProtected, loginURL, ...props }: RouteType) => <Public {...props} />

export { Router as default, Router };
