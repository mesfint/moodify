import { ReactNode } from 'react'; // For children prop
import { Outlet } from 'react-router-dom';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import { useMoodify } from '../hooks/useMoodify';

interface LayoutProps {
  children?: ReactNode; // Add children to accept Routes
}

const Layout = ({ children }: LayoutProps) => {
  const { logout, accessToken, profile, login } = useMoodify();

  return (
    <div className="min-h-screen flex bg-secondary-dark text-secondary-text-light">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-4">
        <Header
          onLogOut={logout}
          accessToken={accessToken}
          profile={profile}
          onLogin={login}
        />
        <main>{children || <Outlet />}</main>
      </div>
    </div>
  );
};

export default Layout;
