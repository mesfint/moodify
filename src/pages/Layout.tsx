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
    <div className="min-h-screen flex  bg-secondary-dark text-secondary-text-light">
      <Sidebar />
      <div className="sticky  w-full bg-secondary-dark z-10">
        <Header
          onLogOut={logout}
          accessToken={accessToken}
          profile={profile}
          onLogin={login}
        />
        <main className="flex-1 overflow-y-auto pt-20 lg:pt-20">
          {children || <Outlet />}
        </main>
        <footer className="bg-secondary-dark text-gray-400 p-4 text-center">
          <p>© 2025 Moodify. Inspired by Spotify.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-green-500">
              About
            </a>
            <a href="#" className="hover:text-green-500">
              Contact
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
