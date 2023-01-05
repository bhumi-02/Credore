import { render } from "react-dom";

import EmailField from "./emailinput";

const rootElement = document.getElementById("root");
render(<EmailField name="test" />, rootElement);
