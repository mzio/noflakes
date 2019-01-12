import Home from "./components/Home";
import CreatePact from "./components/CreatePact";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import ViewPacts from "./components/ViewPacts";
import { HomeSignIn, HomeDefault, HomeProfile } from "./components/HomeStates";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/createPact",
    exact: true,
    component: CreatePact
  },
  {
    path: "/profile",
    exact: true,
    component: Profile
  },
  {
    path: "/viewPacts/accepted",
    exact: true,
    component: ViewPacts,
    mode: "accepted"
  },
  {
    path: "/viewPacts/pending",
    exact: true,
    component: ViewPacts,
    mode: "pending"
  },
  {
    path: "*",
    restricted: false,
    component: NotFound
  }
];

export default routes;
