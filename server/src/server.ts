import App from "./app";
import { validiateEnv } from "@core/utils";
import AuthRoute from "@modules/auth/auth.route";
import { IndexRoute } from "@modules/index";
import { UsersRoute } from "@modules/users";
require('dotenv').config();

validiateEnv();
const routes = [new IndexRoute(), new UsersRoute(), new AuthRoute()];

const app = new App(routes);

app.listen();
