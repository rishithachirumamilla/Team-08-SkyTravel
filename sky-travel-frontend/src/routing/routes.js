import Airline from "../components/flows/Airline";
import Auth from "../components/flows/Auth";
import Client from "../components/flows/Client";
import Dashboard from "../pages/airline/Dashboard";
import Routes from "../pages/airline/Routes";
import Schedules from "../pages/airline/Schedules";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import FlightSchedules from "../pages/client/FlightSchedules";
import PassengerInfoForm from "../pages/client/FlightSchedules/components/PassengerInfoForm";
import Home from "../pages/client/Home";
import AirlinePR from "./PrivateRoutes/AirlinePR";
//import Payment from "../pages/client/FlightSchedules/components/Payment";
import PaymentForm from "../pages/client/FlightSchedules/components/PaymentForm";
import MyBookingsPage from "../pages/client/Bookings/MyBookingsPage";
import SuccessMessage from "../pages/client/Bookings/SuccessMessage";
import AdminSupportTicketsPage from "../pages/airline/Customersupporttickets/Components/AdminSupportTicketsPage";
import AdminSupportTicketDetailsPage from "../pages/airline/Customersupporttickets/Components/AdminSupportTicketDetailsPage";
import Payment from "../pages/client/Bookings/Payment";
import BookingSuccessMessage from "../pages/client/Bookings/BookingSuccessMessage";
import FAQPage from "../pages/client/FAQ/FAQPage";
import ProfilePage from "../pages/client/Profile/ProfilePage";
export const routes = [
  {
    name: "Auth",
    path: "/auth",
    component: Auth,
    isPrivate: false,
    subRoutes: [
      {
        name: "Sign In",
        path: "signin",
        component: SignIn,
      },
      {
        name: "Sign Up",
        path: "signup",
        component: SignUp,
      },
      {
        name: "Sign In",
        path: "airline/signin",
        component: SignIn,
      },
      {
        name: "Sign Up",
        path: "airline/signup",
        component: SignUp,
      },
   
    ],
  },
  {
    name: "Client",
    path: "/",
    component: Client,
    isPrivate: false,
    subRoutes: [
      {
        name: "Home",
        path: "/",
        component: SignIn,
      },
      {
        name: "Flight Schedules",
        path: "/flightschedules",
        component: FlightSchedules,
      },
      {name:"Passenger Info",
      path: "/passenger-info",
      component: PassengerInfoForm
      },
      {name:"Payment",
      path: "/payment",
      component: Payment  
      },
      {name:"MyBookings",
      path: "/mybookings",
      component: MyBookingsPage , 
      },
      {name:"SuccessMessage",
      path: "/client/bookings/cancel/success",
      component: SuccessMessage , 
      },
      {name:"BookingSuccessMessage",
      path: "/client/bookings/success",
      component: BookingSuccessMessage , 
      },
      {
        name: "FAQ",
        path: "/client/faqs",
        component: FAQPage,
      },
      {
        name: "Profile",
        path: "/client/profile",
        component: ProfilePage,
      },

    ],
  },
  {
    name: "Airline",
    path: "/airline",
    component: Airline,
    isPrivate: true,
    PrivateRoute: AirlinePR,
    subRoutes: [
      {
        name: "Dashboard",
        path: "dashboard",
        component: Dashboard,
      },
      {
        name: "Routes",
        path: "routes",
        component: Routes,
      },
      {
        name: "Schedules",
        path: "schedules",
        component: Schedules,
      },
      {
        name: "Tickets",
        path: "tickets",
        component: AdminSupportTicketsPage,
      },
      {
        name: "Ticket-Reply",
        path: "support-tickets-reply/:ticketId",
        component: AdminSupportTicketDetailsPage,
      },
    ],
  },
];
