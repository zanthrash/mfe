import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./component/Header";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import Progress from "./component/Progress";
import { createBrowserHistory } from "history";
// import { MarketingApp } from "./component/MarketingApp";
// import { AuthApp } from "./component/AuthApp";
const MarketingAppLazy = lazy(() => import("./component/MarketingApp"));
const AuthAppLazy = lazy(() => import("./component/AuthApp"));
const DashboardAppLazy = lazy(() => import("./component/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardAppLazy />
              </Route>
              <Route path="/" component={MarketingAppLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
