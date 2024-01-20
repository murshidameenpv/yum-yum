import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Offers from "../pages/Offers/Offers";


//This is the root path,every routes will start from here
// whatever element goes as its children it will go to the  outlet in Main
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/offers",
                element: <Offers />
            }
        ]
    },
]);
export default router