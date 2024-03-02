import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { EventPage, loader as EventPageLoader } from "./pages/EventPage";
import { EventsPage, loader as EventsPageLoader } from "./pages/EventsPage";
import { CategoryPage, loader as CategoryLoader } from "./pages/CategoryPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: EventsPageLoader,
      },
      {
        path: "/events/:id",
        element: <EventPage />,
        loader: EventPageLoader,
      },
      {
        path: "/categories/:categoryId",
        element: <CategoryPage />,
        loader: CategoryLoader,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
