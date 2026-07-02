import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../features/dashboard/Dashboard";
import BlankLayout from "@/layouts/BlankLayout";
import { ProtectedRoute } from "@/layouts/ProtectedRoute";
import FullLayout from "@/layouts/FullLayout";
import RoleRoute from "@/layouts/RoleRoute";
import Login from "@/features/auth/Login";
import Setting from "@/features/setting/Setting";
import Products from "@/features/products/Products";
import Profile from "@/features/profile/Profile";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
    },

    {
        path: "/auth",
        element: <BlankLayout />,
        children: [{ path: "login", element: <Login /> }],
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <FullLayout />,
                children: [
                    {
                        element: <RoleRoute roles={[]} />,
                        children: [
                            { path: "dashboard", element: <Dashboard /> },
                            { path: "products", element: <Products /> },
                            { path: "setting", element: <Setting /> },
                            { path: "profile", element: <Profile /> },

                        ],
                    },
                ],
            },
        ],
    },
]);