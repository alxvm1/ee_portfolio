import { type FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AdminPage } from "@pages/AdminPage";
import { HomePage } from "@pages/HomePage";
import { NotFoundPage } from "@pages/NotFoundPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/project/:category/:id", element: <HomePage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export const Router: FC = () => <RouterProvider router={router} />;
