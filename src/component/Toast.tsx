import { useMoodify } from '../hooks/useMoodify';

const Toast = () => {
  const { notification } = useMoodify();

  return (
    <div
      className={`fixed top-4 right-4 bg-green-700 text-white p-3 rounded-lg shadow-md transition-opacity duration-300 ${
        notification.visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ display: notification.visible ? 'block' : 'none' }}
    >
      {notification.message}
    </div>
  );
};

export default Toast;
