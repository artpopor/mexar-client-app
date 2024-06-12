import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Remmittance from "../pages/Remmittance";
import Setting from "../pages/SettingPage";
import Transaction from "../pages/Transaction/Transaction";
import TransactionDetail from "../pages/Transaction/TransactionDetail";
import Profile from "../pages/Profile";
import Rate from "../pages/Rate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/remittance",
    element: <Remmittance />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/transaction",
    element: <Transaction/>,
  
  },
  {
    path: "/transaction/:transactionId",
    element: <TransactionDetail />,
  
  },

  {
    path:'/profile',
    element:<Profile/>
  }
  ,

  {
    path:'/rate',
    element:<Rate/>
  }
]);
