import { Routes, Route, Navigate } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgetPassword from "./pages/Forgetpassword";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { AuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import Loading from "./components/Loading";
import ResetPassword from "./pages/ResetPassword";

const ProtectRoutes = ({ children }) => {
  const { isAuthenticated, user } = AuthStore();
  console.log("user in app,jsx", user);

  if (!isAuthenticated) {
    return <Navigate to="login" replace />;
  }
  if (!user.isverified) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

// Redirect Auth user to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = AuthStore();
  if (isAuthenticated && user.isverified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const { isCheckingAuth, verifyUser } = AuthStore();
  useEffect(() => {
    verifyUser();
    console.log("verifying user in app.jsx");
  }, [verifyUser]);

  if (isCheckingAuth) return <Loading />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape
        color="bg-green-500"
        size="size-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="size-48"
        top="60%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="size-24"
        top="40%"
        left="-10%"
        delay={2}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoutes>
              <DashboardPage />
            </ProtectRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/forget-Password"
          element={
            <RedirectAuthenticatedUser>
              <ForgetPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-Password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
