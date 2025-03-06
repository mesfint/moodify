import { ChevronDown, Search } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import logo from '../assets/logo.png';
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
  return (
    <>
      <header
        role="banner"
        className=" flex flex-col-1 justify-between mx-6 py-6 "
      >
        <div className="flex flex-shrink-0 flex-1">
          <img src={logo} alt="Logo" />
        </div>
        {/* <nav role="navigation" className="hidden md:block space-x-4">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/" end>
              Trending Concerts
            </NavLink>
            <NavLink to="/">All Concerts</NavLink>
            <NavLink to="/">Account</NavLink>
          </nav> */}
        <div className="flex gap-8">
          <form className="relative ">
            <Search className="absolute my-1 mx-1.5   text-secondary-text-light  " />
            <input
              type="text"
              placeholder="Search"
              className=" pl-8 pr-0 py-1.5  text-sm border-1
                 border-secondary-border  rounded-full
                  text-secondary-text-light "
            />
          </form>

          <div className="flex-shrink-0 mt-0">
            {!accessToken ? (
              <Button
                onClick={onLogin}
                className={twMerge(
                  buttonStyles({ variant: 'default', size: 'medium' }),
                  'bg-secondary-text-dim text-secondary-text-light hover:bg-secondary-dark-hover'
                )}
              >
                Login
              </Button>
            ) : (
              <div className="flex gap-0 bg-secondary-text-dim border-1 border-secondary-text-dim rounded-full">
                <Button
                  className={twMerge(
                    buttonStyles({ variant: 'default', size: 'icon' }),
                    ' text-secondary-text-light hover:bg-secondary-dark-hover w-14 h-14'
                  )}
                >
                  <img
                    src={profile?.images[0]?.url}
                    alt={profile?.display_name}
                    className="w-11 h-11 rounded-full mb-2"
                  />
                </Button>
                {/* <p className="font-bold">{profile?.display_name}</p>
          <p>Email: {profile?.email}</p>
          <p>ID: {profile?.id}</p>
          <p>Profile: {profile?.uri}</p> */}

                <Button
                  onClick={onLogOut}
                  className={twMerge(
                    buttonStyles({ variant: 'default', size: 'small' }),
                    'flex gap-1 justify-center bg-secondary-text-dim text-secondary-text-light hover:bg-secondary-dark-hover'
                  )}
                  //className=""
                >
                  Logout <ChevronDown />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
