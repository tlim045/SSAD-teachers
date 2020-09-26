import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import ViewQuestionsPage from "views/ViewQuestions";
import StudentPage from "views/ViewStudents";
import LabPage from "views/ViewLabs";

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
    path: "/student/Michael-Scott",
    name: "Michael Scott",
    component: StudentPage,
    layout: "/admin",
    icon: EditIcon,
    hidden: true
  },
  {
    path: "/lab/BCG3",
    name: "BCG3",
    component: LabPage,
    layout: "/admin",
    icon: EditIcon,
    hidden: true
  },
  {
    name: "Sign Out",
    icon: ExitToAppIcon,
  }
];

export default dashboardRoutes;
