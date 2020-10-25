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
