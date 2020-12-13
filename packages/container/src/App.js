import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MarketingApp } from "./component/MarketingApp";
import Header from "./component/Header";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export const App = () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <MarketingApp />
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
