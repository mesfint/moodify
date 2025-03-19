import { Heart, Sidebar } from 'lucide-react';
import { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../component/Header';
import { useMoodify } from '../hooks/useMoodify';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { logout, accessToken, profile, login, theme } = useMoodify();
  const location = useLocation();

  const getHeaderContent = () => {
    if (location.pathname === '/favourite') {
      return {
        title: (
          <div className="flex ">
            <Heart fill="green" size={30} strokeWidth={0} />
            <span className="font-bold text-xl">Favourite</span>
          </div>
        ),
        subtitle: 'Songs you liked',
      };
    } else if (location.pathname.startsWith('/playlists')) {
      return {
        title: 'My Library',
        subtitle: 'Playlists',
      };
    }
    return { title: '', subtitle: '' }; // Default for Home
  };

  const { title, subtitle } = getHeaderContent();

  return (
    <div
      className={`min-h-screen flex ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'}`}
    >
      <Sidebar />
      <div
        className={`sticky w-full ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'} z-10`}
      >
        <Header
          onLogOut={logout}
          accessToken={accessToken}
          profile={profile}
          onLogin={login}
          title={title}
          subtitle={subtitle}
        />
        <main className="mb-auto flex-1 overflow-y-auto pt-20 lg:pt-20">
          {children || <Outlet />}
        </main>
        <footer
          className={`sticky top-[100vh] ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'} my-4 border-t-1 dark:border-neutral-800 w-245 text-gray-400 p-4 text-center`}
        >
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
