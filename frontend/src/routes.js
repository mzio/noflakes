import Home from "./components/Home";
import CreatePact from "./components/CreatePact";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import ViewPacts from "./components/ViewPacts";
import PactDetails from "./components/PactDetails";
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
    path: "/pact/:pactId",
    component: PactDetails
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
    path: "/viewPacts/:mode",
    exact: true,
    component: ViewPacts
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
