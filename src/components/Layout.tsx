import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="app">
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
