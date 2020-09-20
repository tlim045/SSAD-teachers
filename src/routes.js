import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import ViewQuestionsPage from "views/ViewQuestions";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Send Assignments",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  // {
  //   path: "/notifications",
  //   name: "Edit Game",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  {
    path: "/questions",
    name: "Edit Game",
    icon: EditIcon,
    component: ViewQuestionsPage,
    layout: "/admin"
  },
  {
    name: "Sign Out",
    icon: ExitToAppIcon,
  }
];

export default dashboardRoutes;
