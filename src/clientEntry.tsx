import React from "react";
import { hydrate } from "react-dom";

import { App, AppProps } from "./components/App";

declare const props: AppProps

hydrate(
    <App {...props}/>,
    document.getElementById("app")
);
