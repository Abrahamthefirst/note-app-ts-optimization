import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import GenericTree from '@/features/sidebar/DirectoryTreeList';
import { Calendar, Home, Inbox, Search, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

export default function DBSidebar() {
  const folders = [];
  const { dispatch, state } = useAuth();
  const navigate = useNavigate();

  const items = [
    {
      title: 'Home',
      url: '#',
      icon: Home,
    },
    {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
    },
    {
      title: 'Calendar',
      url: '#',
      icon: Calendar,
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
    },
  ];

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

//  so we have a backend that sends a token in re
