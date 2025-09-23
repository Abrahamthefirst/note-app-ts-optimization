import { Routes, Route} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Login from './features/auth/pages/Login';
import Signup from './features/auth/pages/Signup';
import ForgotPassword from './features/auth/pages/ForgotPassword';
import ResetPassword from './features/auth/pages/ResetPassword';
import RequestVerificationLink from './features/auth/pages/RequestVerificationLink';
import DBLayout from './layout/DBLayout';
import { Suspense, lazy } from 'react';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const EditorDashboard = lazy(() => import('./pages/EditorDashboard'));
const ViewerDashboard = lazy(() => import('./pages/ViewerDashboard'));
const NoteList = lazy(() => import('./features/notes/components/NoteList'));
const NewNote = lazy(() => import('./features/notes/pages/NewNote'));

function App() {
  // const roleBasedRoutes = useRoleBasedRoutes();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes - NO AUTH REQUIRED */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route
          path="email/verification-link/:token"
          element={<RequestVerificationLink />}
        />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes - AUTH REQUIRED */}
        <Route element={<RequireAuth />}>
          {/* Use static routing here to avoid the bug */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="editor" element={<EditorDashboard />} />
          <Route path="viewer" element={<ViewerDashboard />} />

          <Route element={<DBLayout />}>
            <Route path="/" element={<ViewerDashboard />} />
            <Route path="directory/:directoryId" element={<NoteList />} />
            <Route path="create-note/:directoryId" element={<NewNote />} />
          </Route>
        </Route>

        {/* Catch-all for 404 pages */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
