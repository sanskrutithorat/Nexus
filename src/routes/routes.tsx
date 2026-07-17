import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../features/dashboard/Dashboard";
import BlankLayout from "@/layouts/BlankLayout";
import { ProtectedRoute } from "@/layouts/ProtectedRoute";
import FullLayout from "@/layouts/FullLayout";
import RoleRoute from "@/layouts/RoleRoute";
import Login from "@/features/auth/Login";
import Setting from "@/features/setting/Setting";
// import Profile from "@/features/profile/Profile";
import Projects from "@/features/projects/Projects";
import Customer from "@/features/customer/Customer";
import Task from "@/features/task/Task";
import Register from "@/features/register/Register";
import Members from "@/features/members/Members";


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
        path: "/auth",
        element: <BlankLayout />,
        children: [{ path: "register", element: <Register /> }],
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
                            { path: "projects", element: <Projects /> },
                            { path: "setting", element: <Setting /> },
                            // { path: "profile", element: <Profile /> },
                            { path: "customer", element: <Customer /> },
                            { path: "task", element: <Task /> },
                            { path: "members", element: <Members /> },

                        ],
                    },
                ],
            },
        ],
    },
]);