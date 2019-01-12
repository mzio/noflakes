import Home from "./components/Home";
import CreatePact from "./components/CreatePact";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import ViewPacts from "./components/ViewPacts";
import About from "./components/About";
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
    path: "/profile/:userId",
    component: Profile
  },
  {
    path: "/profile",
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
    path: "/pacts/:pactId"
  },
  {
    path: "/about",
    exact: true,
    component: About
  },
  {
    path: "*",
    restricted: false,
    component: NotFound
  }
];

export default routes;
