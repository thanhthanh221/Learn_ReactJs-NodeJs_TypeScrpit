import App from "./app";
import { validiateEnv } from "@core/utils";
import { IndexRoute } from "@modules/index";
require('dotenv').config();

validiateEnv();
const routes = [new IndexRoute()];

const app = new App(routes);

app.listen();
