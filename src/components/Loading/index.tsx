import React, { ReactElement } from "react";
import "./loader.css"

function Loading(): ReactElement {
    return (
        <div className="preloader">
            <div className="loader" />
        </div>
    );
}

export default Loading;
