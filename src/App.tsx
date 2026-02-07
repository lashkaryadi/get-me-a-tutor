import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Olympiad from "./pages/Olympiad";
import VerifyOTP from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import TutorProfile from "./pages/TutorProfile";
import PostJob from "./pages/PostJob";
import ApplyJob from "./pages/ApplyJob";
import InstituteDashboard from "./pages/InstituteDashboard";
import TrackApplication from "./pages/TrackApplication";
import SuperadminDashboard from "./pages/SuperadminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CompleteTutorProfile from "@/pages/CompleteTutorProfile";
import MyApplications from "./pages/MyApplications";
import ManageApplications from "./pages/ManageApplications";
import NotFound from "./pages/NotFound";
import InstituteJobs from "./pages/InstituteJobs";
import BuyCredits from "./pages/BuyCredits";
import TutorDashboard from "./pages/TutorDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import ProtectedRoute from "@/routes/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/jobs" element={<Feed />} />
          <Route path="/tutor/:id" element={<TutorProfile />} />
          <Route path="/post-job" element={
            <ProtectedRoute allowedRoles={["institute"]}>
              <PostJob />
            </ProtectedRoute>
          } />
          <Route path="/apply/:id" element={<ApplyJob />} />
          <Route path="/institute/dashboard" element={
            <ProtectedRoute allowedRoles={["institute"]}>
              <InstituteDashboard />
            </ProtectedRoute>
          } />
          <Route path="/track-application" element={<TrackApplication />} />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SuperadminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/olympiad" element={<Olympiad />} />
          <Route path="/my-applications" element={
            <ProtectedRoute allowedRoles={["tutor"]}>
              <MyApplications />
            </ProtectedRoute>
          } />
          <Route path="/tutor/dashboard" element={
            <ProtectedRoute allowedRoles={["tutor"]}>
              <TutorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/manage-applications/:jobId" element={
            <ProtectedRoute allowedRoles={["institute"]}>
              <ManageApplications />
            </ProtectedRoute>
          } />
          <Route path="/complete-profile" element={<CompleteTutorProfile />} />
          <Route path="/institute/jobs" element={<InstituteJobs />} />
          <Route
            path="/edit-profile"
            element={<CompleteTutorProfile isEdit />}
          />
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/parent/dashboard" element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/buy-credits" element={<BuyCredits />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
