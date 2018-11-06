import routeWrapper from './routeWraper';
import renderRoutes from './renderRoutes';
import Home from "src/screens/home";
import Contact from "src/screens/contact";

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/contact',
    component: Contact,
    exact: true,
  },
  {
    path: "/contact/a",
    component: Home,
    exact: true,
  },
];

export default routes;
export const RouteWrapper = routeWrapper;
export const RenderRoutes = renderRoutes;