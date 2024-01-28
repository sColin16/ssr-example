import { hydrate } from "react-dom";

import { App, AppProps } from "shared/components/App";

declare const props: AppProps

hydrate(
    <App {...props}/>,
    document.getElementById("app")
);
