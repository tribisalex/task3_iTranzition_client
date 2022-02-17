import AdminPage from "./pages/AdminPage";
import {ADMIN_ROUTE, LOGIN_ROUTE, MY_PAGE, REGISTRATION_ROUTE} from "./utils/consts";
import MyPage from "./pages/MyPage";
import Auth from "./pages/Auth";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },
  {
    path: MY_PAGE,
    Component: MyPage
  }
]

export const publicRoutes = [
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  }
]