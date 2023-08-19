import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home/index";
import Result from "./components/result/index";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);
