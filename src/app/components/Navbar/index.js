import React from 'react';
import { NavLink } from 'react-router-dom';
import { t } from 'i18next';

import styles from './styles.module.scss';

import Routes from '~constants/routes';

function Navbar() {
  return (
    <nav className={`row space-between center ${styles.navbar}`}>
      <h2 className={`title ${styles.title}`}>Username</h2>
      <div className={`row ${styles.containerLinks}`}>
        <NavLink
          to={Routes.HOME}
          className={`row middle subtitle m-right-4 ${styles.link}`}
          activeClassName={styles.active}
          exact
        >
          <i className="fas fa-map-signs m-right-1" />
          {t('Navbar:home')}
        </NavLink>
        <NavLink
          to={Routes.PROFILE}
          className={`row middle subtitle ${styles.link}`}
          activeClassName={styles.active}
          exact
        >
          <i className="fas fa-shoe-prints m-right-1" />
          {t('Navbar:profile')}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
