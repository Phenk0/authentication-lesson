import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import AuthenticationPage, { action as authAction } from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, Component: HomePage },
      {
        path: "events",
        Component: EventsRootLayout,
        children: [
          {
            index: true,
            Component: EventsPage,
            loader: eventsLoader
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                Component: EventDetailPage,
                action: deleteEventAction
              },
              {
                path: "edit",
                Component: EditEventPage,
                action: manipulateEventAction,
                loader: checkAuthLoader
              }
            ]
          },
          {
            path: "new",
            Component: NewEventPage,
            action: manipulateEventAction,
            loader: checkAuthLoader
          }
        ]
      },
      {
        path: "newsletter",
        Component: NewsletterPage,
        action: newsletterAction
      },
      { path: "auth", Component: AuthenticationPage, action: authAction },
      { path: "logout", action: logoutAction }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
