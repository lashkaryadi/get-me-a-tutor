import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

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
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/apply/:id" element={<ApplyJob />} />
          <Route path="/institute/dashboard" element={<InstituteDashboard />} />
          <Route path="/track-application" element={<TrackApplication />} />
          <Route path="/admin" element={<SuperadminDashboard />} />
          <Route path="/olympiad" element={<Olympiad />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
