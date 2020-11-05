import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/Assignment/SendAssignment.js";
import ViewQuestionsPage from "views/ViewQuestions";
import StudentPage from "views/ViewStudents";
import LabPage from "views/ViewLabs";
import CreateStudentAccount from "views/CreateStudentAccount";
import GalaxyPage from "views/ViewGalaxy";
import Logout from '../src/layouts/logout';


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
    path: "/createAccounts",
    name: "Create Account",
    icon: CreateNewFolderIcon,
    component: CreateStudentAccount,
    layout: "/admin"
  },
  {
    path: "/student",
    name: "Student page",
    component: StudentPage,
    layout: "/admin",
    icon: EditIcon,
    hidden: true
  },
  {
    path: "/lab",
    name: "Lab group",
    component: LabPage,
    layout: "/admin",
    icon: EditIcon,
    hidden: true
  },
  {
    path: "/galaxy/",
    name: "Galaxy page",
    component: GalaxyPage,
    layout: "/admin",
    icon: EditIcon,
    hidden: true,
  },
  {
    path: "/logout",
    component: Logout,
    name: "Sign Out",
    icon: ExitToAppIcon,
    layout: "/admin"
  }
];

export default dashboardRoutes;
