import { ChevronDown, ChevronUp, Circle, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useMoodify } from '../hooks/useMoodify';
import { UserProfile } from '../types/spotify';
import { Button } from './Button';

interface SpotifyAuthProps {
  onLogOut: () => void;
  onLogin: () => void;
  accessToken: string | null;
  profile: UserProfile | null;
  title?: React.ReactNode;
  subtitle?: string;
}

const Header = ({
  onLogOut,
  accessToken,
  onLogin,
  title,
  subtitle,
}: SpotifyAuthProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  const { theme, toggleTheme, profile } = useMoodify();
  console.log('Header rendering with profile:', profile);

  return (
    <header
      role="banner"
      className={`sticky top-0 left-0 z-10 flex  justify-between  mx-4 py-4 gap:10 lg:gap:20 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
    >
      {/* small devices */}
      <div className=" md:hidden flex flex-shrink-0 py-4 px-2">
        <span
          className={` font-bold text-xl ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'}`}
        >
          M
        </span>
        <div className="flex flex-row-reverse items-center">
          <Circle className="rounded-full w-3 xs:h-3 stroke-none fill-green-700" />
          <Circle className="rounded-full w-2 xs:h-2 stroke-none fill-green-800" />
          <Circle className="rounded-full w-1.5 xs:h-1.5 stroke-none fill-green-900" />
        </div>
      </div>
      {/* Larger Devices */}
      <div
        className={`md:flex  hidden  gap-1.5 py-4 px-4 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : 'bg-white text-secondary-text-dim'} rounded-lg shadow-md`}
      >
        <h3 className="font-display font-bold text-lg">Moodify</h3>
        <div className="flex flex-row-reverse items-center">
          <Circle className="rounded-full w-5 h-5 stroke-none fill-green-700" />
          <Circle className="rounded-full w-3.5 h-3.5 stroke-none fill-green-800" />
          <Circle className="rounded-full w-2 h-2 stroke-none fill-green-900" />
        </div>
      </div>

      <div className="flex  flex-col">
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm pl-3 text-gray-400">{subtitle}</p>}
      </div>

      {/* Logo */}
      {/* <div className="flex-shrink-0 bg-gradient-to-b from-secondary-text-dim via-secondary-dark to-secondary-dark p-3 rounded-lg shadow-md">
        <h3 className="text-white font-display font-bold text-lg">Moodify</h3>
      </div> */}

      {/* Auth Section */}
      <div className="flex items-center gap-4 mx-4">
        <Button
          variant="default"
          size="icon"
          className={`${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
        {/* {!accessToken ? (
          <Button
            onClick={onLogin}
            className={` ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}   border-1 rounded-full px-4 py-2 text-sm`}
          >
            Login with Spotify
          </Button>
        ) : (
          <div className="relative flex items-center">
            <div
              className={` w-12 h-12 flex items-center justify-center rounded-full `}
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {profile ? (
                <img
                  src={profile.images?.[0]?.url || 'default-avatar.png'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300" />
              )}
              <span>{profile?.display_name || 'Guest'}</span>
              <ButtonIcon className="w-5 h-5 text-secondary-text-light ml-1" />
            </div>
            {isExpanded && (
              <div
                className={`absolute right-0 top-full mt-2 w-48 ${theme === 'dark' ? 'bg-secondary-text-dim text-secondary-text-light' : ' bg-white text-secondary-text-dim'} border-1  rounded-lg shadow-lg z-10`}
              >
                <ul className="py-2">
                  <li>
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-secondary-text-light hover:bg-secondary-dark-hover cursor-pointer"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={onLogOut}
                      className="block w-full text-left px-4 py-2 text-sm text-secondary-text-light hover:bg-secondary-dark-hover cursor-pointer"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )} */}
      </div>
    </header>
  );
};

export default Header;
