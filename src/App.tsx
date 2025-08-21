import { Routes, Route } from 'react-router-dom';
import NewNote from './features/notes/pages/NewNote';
import RequireAuth from './components/RequireAuth';
import Login from './features/auth/pages/Login';
import Signup from './features/auth/pages/Signup';
import { useRoleBasedRoutes } from './hooks/useRoleBasedRoutes';

function App() {
  const roleBasedRoutes = useRoleBasedRoutes();
  return (
    <Routes>
      <Route path="/new" element={<NewNote />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />

      <Route element={<RequireAuth />}>{roleBasedRoutes}</Route>

      <Route path="*" element={<div>404 Page Not Found</div>} />
      <Route />
    </Routes>
  );
}

export default App;
