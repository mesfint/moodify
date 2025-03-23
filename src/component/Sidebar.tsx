import { Heart, Home, Plus } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useMoodify } from '../hooks/useMoodify';
import { Button } from './Button';

const Sidebar = () => {
  const { theme, playlists } = useMoodify();

  return (
    <>
      {/* Small Screen Sidebar (Icons Only) */}
      <aside
        className={`fixed top-26 bottom-0 w-16 flex flex-col items-center gap-4 lg:hidden overflow-y-auto scrollbar-hidden ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'}`}
      >
        <NavLink to="/" end className="flex items-center py-1">
          <Button variant="ghost" size="icon">
            <Home />
          </Button>
        </NavLink>
        <NavLink to="/favourite" end className="flex items-center py-1">
          <Button variant="ghost" size="icon">
            <Heart />
          </Button>
        </NavLink>
        <NavLink to="/playlists" end className="flex items-center py-1">
          <Button variant="ghost" size="icon">
            <Plus />
          </Button>
        </NavLink>
      </aside>

      {/* Large Screen Sidebar */}
      <aside
        className={`hidden lg:flex fixed top-26 bottom-0 w-56  flex-col gap-2 px-2 overflow-y-auto scrollbar-hidden ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'}`}
      >
        <nav role="navigation" className="flex flex-col gap-2">
          <NavLink
            to="/"
            end
            className={`flex items-center gap-4 py-3 px-3 rounded-lg ${theme === 'dark' ? 'hover:bg-secondary-text-dim text-secondary-text-light' : 'bg-white hover:bg-secondary-text-light text-secondary-text-dim'}`}
          >
            <Home className="w-6 h-6" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/favourite"
            end
            className={`flex items-center gap-4 py-3 px-3 rounded-lg ${theme === 'dark' ? 'hover:bg-secondary-text-dim text-secondary-text-light' : 'bg-white hover:bg-secondary-text-light text-secondary-text-dim'}`}
          >
            <Heart className="w-6 h-6" />
            <span>Your Favourites</span>
          </NavLink>
          <div className="py-3 px-3">
            <NavLink
              to="/playlists"
              end
              className={`flex items-center gap-2 ${theme === 'dark' ? 'hover:bg-secondary-text-dim text-secondary-text-light' : 'bg-white hover:bg-secondary-text-light text-secondary-text-dim'}`}
            >
              <Plus className="w-6 h-6" />
              <span className="underline">Playlists</span>
            </NavLink>
            <div className="mt-2">
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <NavLink
                    key={playlist.id}
                    to={`/playlists/${playlist.id}`}
                    className={`block py-2 px-4 rounded-lg text-sm ${theme === 'dark' ? 'hover:bg-secondary-text-dim text-secondary-text-light' : 'hover:bg-secondary-text-light text-secondary-text-dim'}`}
                  >
                    {playlist.name}
                  </NavLink>
                ))
              ) : (
                <p className="text-sm px-4">No playlists yet</p>
              )}
            </div>
          </div>
        </nav>
        <div
          className={`flex-1 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'}`}
        ></div>
      </aside>
    </>
  );
};

export default Sidebar;
