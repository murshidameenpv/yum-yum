import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Offers from "../pages/Offers/Offers";
import Menu from "../pages/Menu/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";

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
        element: <Menu/>,
      },
      {
        path: "/update-profile",
        element:<UpdateProfile/>
      }
    ],
    },
    //Signup page will no have header and footr so it wont have childs
    {
        path: "/signup",
        element:<Signup/>
        
    }
]);
export default router;
