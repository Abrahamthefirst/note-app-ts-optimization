import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import DBSidebar from './DBSidebar';
export default function DBLayout() {
  return (
    <SidebarProvider>
      <DBSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
