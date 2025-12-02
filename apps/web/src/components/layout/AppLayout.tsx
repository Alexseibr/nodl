import { Link, Outlet } from 'react-router-dom';
import './layout.css';

export const AppLayout = () => (
  <div className="app-shell">
    <header className="app-header">
      <Link to="/" className="logo">NODL</Link>
      <nav>
        <Link to="/tenders">Tenders</Link>
        <Link to="/stores">Stores</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
    <main className="app-main">
      <Outlet />
    </main>
  </div>
);
