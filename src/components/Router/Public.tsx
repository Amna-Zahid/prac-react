import React, { FC } from "react";
import { Route } from "react-router-dom";
import { RouteType } from "./types";

const Public: FC<RouteType> = ({ ...rest }) => <Route {...rest} />;

export { Public as default, Public };
