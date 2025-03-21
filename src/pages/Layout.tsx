import { Heart } from 'lucide-react';
import { ReactNode } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from '../component/Header';
import MoodCategories from '../component/MoodCategories'; // Import it here
import Sidebar from '../component/Sidebar';
import { useMoodify } from '../hooks/useMoodify';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { logout, accessToken, profile, login, theme, moods, setSelectedMood } =
    useMoodify(); // Add moods, setSelectedMood
  const location = useLocation();

  const getHeaderContent = () => {
    if (location.pathname === '/favourite') {
      return {
        title: (
          <div className="flex items-center gap-2">
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
      className={`min-h-screen flex flex-col gap-2 overflow-x-hidden  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'}`}
    >
      <div className="border sticky top-0 z-20">
        <Header
          onLogOut={logout}
          accessToken={accessToken}
          profile={profile}
          onLogin={login}
          title={title}
          subtitle={subtitle}
        />
      </div>

      <div className="flex gap-2 justify-between">
        <div className="sticky top-0 border w-16 lg:w-56 h-screen">
          <Sidebar />
        </div>

        <div className="flex flex-col gap-2 w-full ">
          {/* Categories: Only render div on home route */}
          {location.pathname === '/' && (
            <div className="border  sticky top-16 z-10 pb-4 ">
              <MoodCategories moods={moods} onMoodSelect={setSelectedMood} />
            </div>
          )}
          <div className="border flex-1">
            <main className="h-full">{children || <Outlet />}</main>
          </div>
        </div>
      </div>

      <div className="border">
        <footer
          className={`sticky top-[100vh] ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'} my-4 border-t-1 dark:border-neutral-800 w-245 text-gray-400 p-4 text-center`}
        >
          <p>
            Developed By{' '}
            <Link
              className="text-green-600"
              to="https://www.linkedin.com/in/mesfin/"
            >
              {''}
              @Mesfin{' '}
            </Link>
            © 2025 Moodify. Inspired by Spotify.
          </p>
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
