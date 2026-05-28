import '../index.css';

const Notification = ({ notification }) => {
  if (!notification.message) return null;

  return (
    <div className={`${notification.className} notification`}>
      {notification.message}
    </div>
  );
};
export default Notification;
