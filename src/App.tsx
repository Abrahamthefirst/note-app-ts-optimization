import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Login from './features/auth/pages/Login';
import Signup from './features/auth/pages/Signup';
import ForgotPassword from './features/auth/pages/ForgotPassword';
import ResetPassword from './features/auth/pages/ResetPassword';
import { useRoleBasedRoutes } from './hooks/useRoleBasedRoutes';
import RequestVerificationLink from './features/auth/pages/RequestVerificationLink';

function App() {
  const roleBasedRoutes = useRoleBasedRoutes();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route
        path="email/verification-link/:token"
        element={<RequestVerificationLink />}
      />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />

      <Route element={<RequireAuth />}>{roleBasedRoutes}</Route>

      <Route path="*" element={<div>404 Page Not Found</div>} />
      <Route />
    </Routes>
  );
}

export default App;
