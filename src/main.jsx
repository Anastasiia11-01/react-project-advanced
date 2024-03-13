import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { CategoryPage } from "./pages/CategoryPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { useEventData } from "./useEventData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/events/:eventId",
        element: <EventPage />,
      },
      {
        path: "/categories/:categoryId",
        element: <CategoryPage />,
      },
    ],
  },
]);
const App = () => {
  const data = useEventData();

  return (
    <ChakraProvider>
      <RouterProvider router={router} data={data} />
    </ChakraProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
