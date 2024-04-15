import * as React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import SignInSide from "./pages/adminAuth/Login";
import SignUp from "./pages/adminAuth/Register";
import Dashboard from "./pages/adminDashboard/Dashboard";
import UsersTable from "./components/adminDash/UsersTable";
import Test from "./pages/Test";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <UsersTable />,
        },
        {
          path: "/new",
          element: <Test />,
        },
      ],
    },
    {
      path: "/adminLogin",
      element: <SignInSide />,
    },
    {
      path: "/adminRegister",
      element: <SignUp />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
