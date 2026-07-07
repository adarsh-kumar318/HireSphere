import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/jobs" element={<Jobs />} />

      <Route path="/jobs/:id" element={<JobDetails />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;