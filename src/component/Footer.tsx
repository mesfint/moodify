// Footer.tsx
import { Book, Github, Link2, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMoodify } from '../hooks/useMoodify';
import { Button } from './Button';

const Footer = () => {
  const { theme } = useMoodify();

  return (
    <footer
      className={`w-full py-12 ${
        theme === 'dark'
          ? 'bg-secondary-dark text-secondary-text-light'
          : 'bg-gray-100 text-secondary-text-dim'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Branding Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold">Moodify</h3>
            <p className="text-sm opacity-75">
              Your vibe, your music. Discover, create, and enjoy playlists that
              match your mood.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:underline hover:opacity-80 transition-opacity"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/playlists"
                  className="text-sm hover:underline hover:opacity-80 transition-opacity"
                >
                  Playlists
                </Link>
              </li>
              <li>
                <Link
                  to="/favourite"
                  className="text-sm hover:underline hover:opacity-80 transition-opacity"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/songs"
                  className="text-sm hover:underline hover:opacity-80 transition-opacity"
                >
                  Current Song
                </Link>
              </li>
            </ul>
            <div className="md:hidden border-b-1 w-16"></div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/mesfint/moodify"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="default"
                  size="icon"
                  className={`border cursor-pointer  rounded-full  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-seconda text-secondary-text-dim'}`}
                >
                  <Link2 size={20} />
                </Button>
              </a>

              <a
                href="https://github.com/mesfint"
                target="_blank"
                rel="noopener noreferrer"
                className=" rounded-full hover:bg-secondary-text-dim transition-colors"
              >
                <Button
                  variant="default"
                  size="icon"
                  className={`border cursor-pointer  rounded-full  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-seconda text-secondary-text-dim'}`}
                >
                  <Github size={20} />
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/in/mesfin/"
                target="_blank"
                rel="noopener noreferrer"
                className=" rounded-full hover:bg-secondary-text-dim transition-colors"
              >
                <Button
                  variant="default"
                  size="icon"
                  className={`border cursor-pointer  rounded-full  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-seconda text-secondary-text-dim'}`}
                >
                  <Linkedin size={20} />
                </Button>
              </a>
              <a
                href="https://dev.to/mesfin_t"
                target="_blank"
                rel="noopener noreferrer"
                className=" rounded-full hover:bg-secondary-text-dim transition-colors"
              >
                <Button
                  variant="default"
                  size="icon"
                  className={`border cursor-pointer  rounded-full  ${theme === 'dark' ? 'bg-secondary-dark text-secondary-text-light' : ' bg-seconda text-secondary-text-dim'}`}
                >
                  <Book size={20} />
                </Button>
              </a>
            </div>
          </div>

          {/* Contact/Support */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-2 ">
              <li>
                <a
                  href="https://mesfin-zeta.vercel.app/"
                  className="text-sm hover:underline hover:opacity-80 transition-opacity"
                >
                  Contact Me
                </a>
              </li>
              <li>
                <Link
                  to="https://mesfin-zeta.vercel.app/"
                  className="text-sm hover:underline hover:opacity-80 transition-opacity"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="https://dev.to/mesfin_t"
                  className="text-sm hover:underline hover:opacity-80 transition-opacity"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-75">
            &copy; {new Date().getFullYear()} Moodify. Developed by{' '}
            <span>
              <Link
                to="https://www.linkedin.com/in/mesfin/"
                className="text-sm underline hover:underline hover:opacity-80 transition-opacity"
              >
                Mesfin.
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
