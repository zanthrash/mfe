import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import Progress from "./component/Progress";

// import { MarketingApp } from "./component/MarketingApp";
// import { AuthApp } from "./component/AuthApp";
const MarketingAppLazy = lazy(() => import("./component/MarketingApp"));
const AuthAppLazy = lazy(() => import("./component/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={MarketingAppLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
