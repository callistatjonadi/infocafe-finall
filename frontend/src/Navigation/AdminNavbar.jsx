import React from "react";
import css from "./Navbar.module.css";
import { useSignOut } from "../Routing/useSignOut";

const AdminNavbar = () => {
  const signout = useSignOut();
  return (
    <nav className={css.navbar}>
      <div className={css.navbarMenu}>
        <div className={css.navbarSection}>
          <a href="/" className={css.navbarLogo}>
            <img src="/images/icons/logo.png" alt="Logo" />
          </a>
          <div className={`${css.navbarItem} ${css.logoName}`}>
            <a href="/">| Indocafe</a>
          </div>
        </div>
        <div className={css.navbarSection}>
          <div className={css.navbarItem}>
            <a href="/" className={css.navbarLink}>
              Home
            </a>
          </div>
          <div className={css.navbarItem}>
            <a href="/admin/cafe-list" className={css.navbarLink}>
              Cafe List
            </a>
          </div>
          <div className={css.navbarItem}>
            <a href="/admin/add-cafe" className={css.navbarLink}>
              Add Cafe
            </a>
          </div>
        </div>
        <div className={css.navbarSection}>
          <button onClick={signout} className={css.navbarSignoutLink}>
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
