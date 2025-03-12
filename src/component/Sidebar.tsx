import { Circle, Heart, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom'; // Fixed import
import { Button } from './Button';

const Sidebar = () => (
  <aside className=" flex-col-1  h-full w-64 py-1 gap-6 bg-secondary-dark text-secondary-text-light">
    <div className="flex-shrink-0 flex items-center gap-2 py-4 mx-4 bg-gradient-to-b from-secondary-text-dim via-secondary-dark to-secondary-dark p-3 rounded-lg shadow-md">
      <h3 className="text-white font-display font-bold text-lg">Moodify</h3>
      <div className="flex flex-row-reverse items-center gap-1">
        <Circle className="rounded-full w-5 h-5 stroke-none fill-green-700" />
        <Circle className="rounded-full w-3.5 h-3.5 stroke-none fill-green-800" />
        <Circle className="rounded-full w-2 h-2 stroke-none fill-green-900" />
      </div>
    </div>

    <nav role="navigation" className="flex flex-col mx-4 gap-2">
      <NavLink to="/" end className="flex items-center gap-2 py-1">
        <Button variant="ghost" size="icon">
          <Home />
        </Button>
        Home
      </NavLink>
      <NavLink to="/favourite" end className="flex items-center gap-2 py-1">
        <Button variant="ghost" size="icon">
          <Heart />
        </Button>
        Your Favourites
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;
