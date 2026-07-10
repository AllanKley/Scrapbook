import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="site-header">
      <div className="page-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <NavLink to="/" className="logo">
          scrapbook
        </NavLink>
        <ul className="site-nav">
          <li>
            <NavLink to="/top10" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              top 10s
            </NavLink>
          </li>
          <li>
            <NavLink to="/devlog" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              devlog
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
