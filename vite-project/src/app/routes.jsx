import { createBrowserRouter } from "react-router";
import Root from "./layouts/Root";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/Dashboard";
import StudentSubjects from "./pages/student/Subjects";
import StudentSchedule from "./pages/student/Schedule";
import StudentPerformance from "./pages/student/Performance";
import FacultyDashboard from "./pages/faculty/Dashboard";
import FacultySubjects from "./pages/faculty/Subjects";
import FacultyStudents from "./pages/faculty/Students";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Login /> },
      { path: "student/dashboard", element: <StudentDashboard /> },
      { path: "student/subjects", element: <StudentSubjects /> },
      { path: "student/schedule", element: <StudentSchedule /> },
      { path: "student/performance", element: <StudentPerformance /> },
      { path: "faculty/dashboard", element: <FacultyDashboard /> },
      { path: "faculty/subjects", element: <FacultySubjects /> },
      { path: "faculty/students", element: <FacultyStudents /> },
      { path: "admin/dashboard", element: <AdminDashboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
