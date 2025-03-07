import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
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

  return (
    <header
      role="banner"
      className="flex items-center justify-between mx-4 py-4 bg-secondary-dark"
    >
      {/* Logo */}
      <div className="flex-shrink-0 bg-gradient-to-b from-secondary-text-dim via-secondary-dark to-secondary-dark p-3 rounded-lg shadow-md">
        {/* <h3 className="text-white font-display font-bold text-lg">Moodify</h3> */}
      </div>

      {/* Search Form */}
      <form className="relative mx-4 w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text-light" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 text-sm border border-secondary-border rounded-full text-secondary-text-light bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
        />
      </form>

      {/* Auth Section */}
      <div className="flex items-center gap-4 mx-4">
        {!accessToken ? (
          <Button
            onClick={onLogin}
            className="bg-secondary-text-dim border border-secondary-border rounded-full px-4 py-2 text-sm text-secondary-text-light hover:bg-secondary-dark-hover"
          >
            Login
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
