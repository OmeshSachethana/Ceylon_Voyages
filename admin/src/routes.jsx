import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  GlobeAmericasIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Tours from "./pages/dashboard/Tours";
import Items from "./pages/dashboard/Items";
import Bookings from "./pages/dashboard/bookings";
import Users from "./pages/dashboard/users";
import Reviews from "./pages/dashboard/reviews";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <GlobeAmericasIcon {...icon} />,
        name: "Tours",
        path: "/tours",
        element: <Tours />,
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
            />
          </svg>
        ),
        name: "Hotels and Restaurants",
        path: "/items",
        element: <Items />,
      },
      {
        icon: <MapPinIcon {...icon} />,
        name: "Booking Requests",
        path: "/bookings",
        element: <Bookings />,
      },
      {
        icon: <ChatBubbleBottomCenterTextIcon {...icon} />,
        name: "Reviews",
        path: "/reviews",
        element: <Reviews />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "User List",
        path: "/users",
        element: <Users />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Blogs",
        path: "/blogs",
        element: <Bookings />,
      },

      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },

      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
    ],
  },
  {
    title: "authentication",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Create new account",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
