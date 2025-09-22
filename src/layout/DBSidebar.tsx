import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import GenericTree from '@/features/sidebar/DirectoryTreeList';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

export default function DBSidebar() {
  const { dispatch, state } = useAuth();
  const navigate = useNavigate();



  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };
  return (
    <Sidebar>
      <SidebarHeader className="font-playfair text-2xl">{state.user?.username}</SidebarHeader>
      <SidebarContent>
        <GenericTree />
        <p onClick={logout} className="cursor-pointer underline p-2 flex gap-2"><LogOut className='my-1 py-2/3'/>logout</p>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

