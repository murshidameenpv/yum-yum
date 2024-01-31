import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Offers from "../pages/Offers/Offers";
import Menu from "../pages/Menu/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";
import Cart from "../pages/Cart/Cart";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard/admin/Dashboard";
import Users from "../pages/Dashboard/admin/Users";
import Login from "../components/Login";
import AddMenu from "../pages/Dashboard/admin/AddMenu";
import ManageItems from "../pages/Dashboard/admin/ManageItems";

//This is the root path,every routes will start from here
// whatever element goes as its children it will go to the  outlet in Main
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRouter>
            <Cart />
          </PrivateRouter>
        ),
      },
    ],
  },
  //Signup page will no have header and footr so it wont have childs
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRouter>
        <AdminLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      {
        path: "manage-items",
        element: <ManageItems/>,
      },
    ],
  },
]);
export default router;
