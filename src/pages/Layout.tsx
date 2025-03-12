import { ReactNode } from 'react'; // For children prop
import { Outlet } from 'react-router-dom';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import { UserProfile } from '../types/spotify';

interface LayoutProps {
  onLogOut: () => void;
  accessToken: string | null;
  profile: UserProfile | null;
  onLogin: () => void;
  children?: ReactNode; // Add children to accept Routes
}

const Layout = ({
  onLogOut,
  accessToken,
  profile,
  onLogin,
  children,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex bg-secondary-dark text-secondary-text-light">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-4">
        <Header
          onLogOut={onLogOut}
          accessToken={accessToken}
          profile={profile}
          onLogin={onLogin}
        />
        <main>{children || <Outlet />}</main>
      </div>
    </div>
  );
};

export default Layout;
