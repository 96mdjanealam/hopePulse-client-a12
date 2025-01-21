import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Home/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Shared/Profile";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import CreateDonation from "../Pages/Dashboard/CreateDonation";
import ViewRequest from "../Pages/Dashboard/ViewRequest";
import EditRequest from "../Pages/Dashboard/EditRequest";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests";
import AllDonationRequests from "../Pages/Dashboard/AllDonationRequests";
import AllUsers from "../Pages/Dashboard/AllUsers";
import ContentManagement from "../Pages/Dashboard/ContentManagement";
import AddBlog from "../Pages/Dashboard/AddBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/createDonation",
        element: <CreateDonation></CreateDonation>,
      },
      {
        path: "/dashboard/request/edit/:id",
        element: <EditRequest></EditRequest>,
      },
      {
        path: "/dashboard/request/view/:id",
        element: <ViewRequest></ViewRequest>,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyDonationRequests></MyDonationRequests>,
      },
      {
        path: "/dashboard/all-donation-requests",
        element: <AllDonationRequests></AllDonationRequests>,
      },
      {
        path: "/dashboard/all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/content-management",
        element: <ContentManagement></ContentManagement>,
      },
      {
        path: "/dashboard/content-management/add-blog",
        element: <AddBlog></AddBlog>
      }
    ],
  },
]);
