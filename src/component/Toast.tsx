import { useMoodify } from '../hooks/useMoodify';

const Toast = () => {
  const { notification } = useMoodify();

  return (
    <div
      className={`top-4 right-4 text-center bg-green-800 text-white p-6 rounded-lg shadow-md transition-opacity duration-300 ${
        notification.visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ display: notification.visible ? 'block' : 'none' }}
    >
      {notification.message}
    </div>
  );
};

export default Toast;
