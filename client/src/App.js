import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Careers from "./pages/Careers/Careers";
import Roadmaps from "./pages/Roadmaps/Roadmaps";
import Aboutus from "./pages/Aboutus/Aboutus";
import Faqs from "./pages/Faqs/Faqs";
import Notfound from "./pages/Notfound/Notfound";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import Verification from "./pages/Verification/Verification";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./context/authentication";
import Protactedroute from "./components/Protactedroute/Protactedroute";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "careers",
        element: (
          <Protactedroute>
            <Careers />
          </Protactedroute>
        ),
      },
      {
        path: "roadmaps",
        element: (
          <Protactedroute>
            <Roadmaps />
          </Protactedroute>
        ),
      },
      {
        path: "aboutus",
        element: <Aboutus />,
      },
      {
        path: "faqs",
        element: <Faqs />,
      },
      {
        path: "profile",
        element: (
          <Protactedroute>
            <Profile />
          </Protactedroute>
        ),
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "verification/:email",
    element: <Verification />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
