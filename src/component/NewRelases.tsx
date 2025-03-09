import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Pause,
  Play,
  Volume2,
} from 'lucide-react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { TrackItem } from '../types/spotify';
import { Button } from './Button';

interface ThumbnailsProps {
  thumbnails: TrackItem[];
}

const NewRelases = ({ thumbnails }: ThumbnailsProps) => {
  return (
    <div className=" flex  flex-col md:gap-4 mx-6">
      <div className="flex ">
        {/* main-slide */}
        <img
          src="https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww"
          className="w-1/2 h-auto  "
        />

        <div className=" w-1/2 h-auto bg-gradient-to-r from-secondary-text-light via-secondary-text-dim to-secondary-dark text-secondary-text-dim p-6">
          {/* Text */}
          <p className="text-white">The Horion of Universe</p>
          <h3 className="font-bold text-white">THE CHAINSMOKERS </h3>
          <p className="text-secondary-text-dim">Finland</p>
          <p className="text-secondary-text-dim">Release Date: 09.23.2025</p>
        </div>
      </div>
      <div className="flex justify-between flex-shrink-0 bg-gradient-to-b from-secondary-text-dim via-secondary-dark to-secondary-dark w-full p-3 rounded-lg shadow-md">
        {/* Controller */}
        <div className="flex">
          <img
            className="w-8 h-8 rounded-md mr-2"
            src="https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww"
          />
          <div>
            <h3 className="font-bold">Inside out</h3>
            <p className="text-sm">The Horion of Universe</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button variant="default" size="icon">
            <ChevronLeft />
          </Button>

          <Button variant="default" size="icon">
            <Play />
          </Button>

          <Button variant="default" size="icon">
            <ChevronRight />
          </Button>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button variant="default" size="icon">
            <Volume2 />
          </Button>
          <Button variant="default" size="icon">
            <Pause />
          </Button>

          <Button variant="default" size="icon">
            <EllipsisVertical />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mx-4 overflow-x-auto justify-center">
        {thumbnails.length > 0 ? (
          thumbnails.map((thumbnail) => (
            <div key={thumbnail.id} className="w-14 h-14 flex-shrink-0">
              <img
                src={thumbnail.album.images[0].url}
                alt={thumbnail.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <p>No album selected yet</p>
        )}
      </div>
    </div>
  );
};

export default NewRelases;
