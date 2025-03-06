import { NavLink } from 'react-router';
import { UserProfile } from '../types/spotify';

interface SpotifyAuthProps {
  onLogOut: () => void;
  onLogin: () => void;
  accessToken: string | null;
  profile: UserProfile | null;
}

const NavBar = ({
  onLogOut,
  accessToken,
  profile,
  onLogin,
}: SpotifyAuthProps) => {
  return (
    <>
      <header role="banner" className=" max-w-full h-30 bg-secondary-dark">
        <div className="container flex flex-col-1 md:col-end-3 text-white mx-auto px-14 py-8 mb-4 justify-between items-center ">
          <div className=" bg-gradient-to-br from-slate-400 to-gray-900">
            <h2 className="text-2xl ">Moodify</h2>
          </div>
          <nav role="navigation" className="hidden md:block space-x-4">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/" end>
              Trending Concerts
            </NavLink>
            <NavLink to="/">All Concerts</NavLink>
            <NavLink to="/">Account</NavLink>
          </nav>
          <div className="">
            {!accessToken ? (
              <button
                onClick={onLogin}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Login with Spotify
              </button>
            ) : (
              <div className="">
                <img
                  src={profile?.images[0]?.url}
                  alt={profile?.display_name}
                  className="w-11 h-11 rounded-full mb-2"
                />
                {/* <p className="font-bold">{profile?.display_name}</p>
          <p>Email: {profile?.email}</p>
          <p>ID: {profile?.id}</p>
          <p>Profile: {profile?.uri}</p> */}

                <button
                  onClick={onLogOut}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
