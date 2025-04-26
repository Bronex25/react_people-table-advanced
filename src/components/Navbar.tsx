import { NavLinkRenderProps, NavLink } from 'react-router-dom';

const activeLink = ({ isActive }: NavLinkRenderProps) => {
  return isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';
};

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={activeLink} to="/">
            Home
          </NavLink>

          <NavLink className={activeLink} to="people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
