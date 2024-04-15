import * as React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import SignInSide from "./pages/adminAuth/Login";
import SignUp from "./pages/adminAuth/Register";
import Dashboard from "./pages/adminDashboard/Dashboard";

// const queryClient = new QueryClient();

// const Layout = () => {
//   return (
//     <div className="app">
//       <QueryClientProvider client={queryClient}>
//         <NavBar />
//         <Outlet />
//         <Footer />
//       </QueryClientProvider>
//     </div>
//   );
// };

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    // {
    //   path: '/',
    //   element: <Layout />,

    //   children: [
    //     {
    //       path: '/',
    //       element: <Home />,
    //     }
    //   ]
    // },
    {
      path: "/adminLogin",
      element: <SignInSide />,
    },
    {
      path: "/adminRegister",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
