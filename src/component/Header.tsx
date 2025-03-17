import { ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useMoodify } from '../hooks/useMoodify';
import { UserProfile } from '../types/spotify';
import { Button, buttonStyles } from './Button';

interface SpotifyAuthProps {
  onLogOut: () => void;
  onLogin: () => void;
  accessToken: string | null;
  profile: UserProfile | null;
}

const Header = ({
  onLogOut,
  accessToken,
  profile,
  onLogin,
}: SpotifyAuthProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  const { theme, toggleTheme } = useMoodify();

  return (
    <header
      role="banner"
      className={`sticky top-0 left-0 z-10 flex  justify-end mx-4 py-4 ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}`}
    >
      {/* Logo */}
      {/* <div className="flex-shrink-0 bg-gradient-to-b from-secondary-text-dim via-secondary-dark to-secondary-dark p-3 rounded-lg shadow-md"> */}
      {/* <h3 className="text-white font-display font-bold text-lg">Moodify</h3> */}
      {/* </div> */}

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
        {!accessToken ? (
          <Button
            onClick={onLogin}
            className={` ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-white text-secondary-text-dim'}   border-1 rounded-full px-4 py-2 text-sm`}
          >
            Login with Spotify
          </Button>
        ) : (
          <div className="relative flex items-center">
            <Button
              className={twMerge(
                buttonStyles({ variant: 'default', size: 'icon' }),
                'text-secondary-text-light hover:bg-secondary-dark-hover w-12 h-12 flex items-center justify-center'
              )}
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              <img
                src={profile?.images[0]?.url}
                alt={profile?.display_name}
                className="w-8 h-8 rounded-full"
              />
              <ButtonIcon className="w-5 h-5 text-secondary-text-light ml-1" />
            </Button>
            {isExpanded && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-secondary-text-dim rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li>
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-secondary-text-light hover:bg-secondary-dark-hover"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={onLogOut}
                      className="block w-full text-left px-4 py-2 text-sm text-secondary-text-light hover:bg-secondary-dark-hover"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
