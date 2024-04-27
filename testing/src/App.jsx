import "./App.css";
import Header from "./components/common/header/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Dashboard from "./pages/dashboard/Dashboard";
import UserTable from "./components/adminDash/UsersTable";
function App() {
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "courses", element: <CourseHome /> },
        { path: "team", element: <Team /> },
        { path: "pricing", element: <Pricing /> },
        { path: "blog", element: <Blog /> },
        { path: "contact", element: <Contact /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [{ index: true, element: <UserTable /> }],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
