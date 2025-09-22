import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import DBSidebar from './DBSidebar';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { genericToast } from '@/lib/toast';
import { requestEmailVerificationLink } from '@/features/auth/api/auth';
export default function DBLayout() {
  const { state } = useAuth();
  const accessToken = state.accessToken as string;
  const isEmailVerified = state.user?.email_verified;

  useEffect(() => {
    if (!isEmailVerified) {
      genericToast({
        message: 'Verify your email',
        timeout: 60 * 1000,
        style: {
          backgroundColor: '#FFF3CD',
          color: '#856404',
        },
        handleClick: async () =>
          await requestEmailVerificationLink(accessToken),
      });
    }
  }, [isEmailVerified, accessToken]);

  return (
    <SidebarProvider>
      <DBSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
