import { Circle, Heart, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from './Button';

const Sidebar = () => (
  <>
    {/* Small Screen Sidebar (Icons Only) */}
    <aside className="sticky top-0 overflow-y-auto scrollbar-hidden  pb-4 flex flex-col items-center gap-4 lg:hidden bg-secondary-dark text-secondary-text-light">
      <div className=" flex  flex-shrink-0 py-4 px-2">
        <span className="text-white font-bold text-xl">M</span>
        <div className="flex flex-row-reverse items-center">
          <Circle className="rounded-full w-3 xs:h-3 stroke-none fill-green-700" />
          <Circle className="rounded-full w-2 xs:h-2 stroke-none fill-green-800" />
          <Circle className="rounded-full w-1.5 xs:h-1.5 stroke-none fill-green-900" />
        </div>
      </div>
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
    </aside>
    {/* Large Screen Sidebar */}
    <aside className="hidden lg:flex w-64 h-90 sticky top-0  overflow-y-auto scrollbar-hidden flex-col gap-2 px-2 bg-secondary-dark text-secondary-text-light">
      <div className="flex-shrink-0 flex items-center gap-1.5 py-4 px-4 bg-gradient-to-b from-secondary-text-dim via-secondary-dark to-secondary-dark rounded-lg shadow-md">
        <h3 className="text-white font-display font-bold text-lg">Moodify</h3>
        <div className="flex flex-row-reverse items-center">
          <Circle className="rounded-full w-5 h-5 stroke-none fill-green-700" />
          <Circle className="rounded-full w-3.5 h-3.5 stroke-none fill-green-800" />
          <Circle className="rounded-full w-2 h-2 stroke-none fill-green-900" />
        </div>
      </div>
      <nav role="navigation" className="flex flex-col gap-2">
        <NavLink
          to="/"
          end
          className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-secondary-text-dim"
        >
          <Home className="w-6 h-6" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/favourite"
          end
          className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-secondary-text-dim"
        >
          <Heart className="w-6 h-6" />
          <span>Your Favourites</span>
        </NavLink>
      </nav>
      {/* Filler to stretch height */}
      <div className="flex-1 bg-secondary-dark"></div>
    </aside>
  </>
);

export default Sidebar;
