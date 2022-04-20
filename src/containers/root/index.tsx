import React, {Suspense} from 'react';
import Loading from "components/Loading";
import {Router as MainRouter, Switch} from "react-router-dom";
import routes from "routes"
import Router from "components/Router";
import history from "containers/App/history";
import NavDrawer from "components/NavDrawer";
import '../../App.css';



function Root() {

    return (
        <div className="parent-root">
            <NavDrawer />
            <div className="main-container">
                {/*<Suspense fallback={<Loading />}>*/}
                {/*    <MainRouter history={history} >*/}
                        <Switch>
                            {routes.map((route) => (
                                <Router key={route.path} {...route} />
                            ))}
                        </Switch>
                {/*    </MainRouter>*/}
                {/*</Suspense>*/}
            </div>

        </div>
    );
}

export default Root;
