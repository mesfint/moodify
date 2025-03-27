import { Heart } from 'lucide-react';
import { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../component/Footer';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import { useMoodify } from '../hooks/useMoodify';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme } = useMoodify();
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
      className={`min-h-scree flex flex-col gap-2 overflow-x-hidden  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'}`}
    >
      <div className="fixed top-0 left-0 right-0 z-30 h-18">
        <Header title={title} subtitle={subtitle} />
      </div>

      <div className="flex flex-1 mt-35 overflow-hidden">
        <div className="  w-16 lg:w-56 h-screen">
          <Sidebar />
        </div>

        <div className="flex flex-col gap-2 w-full ">
          {/* Categories: Only render div on home route */}
          {location.pathname === '/' && (
            <div className="  fixed top-20  z-30  ">
              {/* <MoodCategories moods={moods} onMoodSelect={setSelectedMood} /> */}
            </div>
          )}
          <div className=" flex-1">
            <main className="flex-grow">{children || <Outlet />}</main>
          </div>
        </div>
      </div>
      <div className=" bottom-0 left-16 lg:left-56 right-0 z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
