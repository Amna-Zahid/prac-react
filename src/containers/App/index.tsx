import React, {Suspense} from 'react';
import Loading from "components/Loading";
import {Router as MainRouter, Switch} from "react-router-dom";
import routes from "routes"
import Router from "components/Router";
import history from "./history";
import NavDrawer from "components/NavDrawer";
import '../../App.css';
import Root from "containers/root";


function App() {
  return (
            <Suspense fallback={<Loading />}>
                <MainRouter history={history} >
                    <Switch>
                        <Router  component={Root} />

                    </Switch>
                </MainRouter>
            </Suspense>
  );
}

export default App;
