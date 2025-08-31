import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import NewNote from '@/features/notes/pages/NewNote';
import NoteList from '@/features/notes/components/NoteList';

import DBLayout from '@/layout/DBLayout';

const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const EditorDashboard = lazy(() => import('../pages/EditorDashboard'));
const ViewerDashboard = lazy(() => import('../pages/ViewerDashboard'));

export const useRoleBasedRoutes = () => {
  const {
    state: { user },
  } = useAuth();
  const role = user?.role;

  const getRoutesByRole = () => {
    switch (role) {
      case 'ADMIN':
        return (
          <>
            <Route path="admin" element={<AdminDashboard />} />
            <Route element={<DBLayout />}>
              <Route path="/" element={<ViewerDashboard />} />
            </Route>
          </>
        );
      case 'EDITOR':
        return (
          <>
            <Route path="editor" element={<EditorDashboard />} />
          </>
        );
      case 'VIEWER':
        return (
          <>
            <Route element={<DBLayout />}>
              <Route path="/" element={<ViewerDashboard />} />
              <Route path="directory/:directoryId" element={<NoteList />} />
              <Route path="create-note/:directoryId" element={<NewNote />} />
            </Route>
          </>
        );
      default:
        return null;
    }
  };

  return getRoutesByRole();
};
