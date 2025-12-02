import { useAuth } from '../hooks/useAuth';

export const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>Please log in via phone or Telegram.</p>;

  return (
    <div className="card">
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Phone: {user.phone}</p>
      <button className="primary" onClick={logout}>Logout</button>
    </div>
  );
};
