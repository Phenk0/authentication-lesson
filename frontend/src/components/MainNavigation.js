import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import NewsletterSignup from "./NewsletterSignup";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  const getActiveClass = ({ isActive }) => (isActive ? classes.active : undefined);
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={getActiveClass} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={getActiveClass}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/newsletter" className={getActiveClass}>
              Newsletter
            </NavLink>
          </li>
          {!Boolean(token) && (
            <li>
              <NavLink to="/auth?mode=login" className={getActiveClass}>
                Authentication
              </NavLink>
            </li>
          )}
          {Boolean(token) && (
            <li>
              <Form method="POST" action="/logout">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
