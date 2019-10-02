import React from 'react';
import { NavLink } from 'react-router-dom';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { ReactComponent as IcHome } from './assets/home.svg';
import { ReactComponent as IcTour } from './assets/tour.svg';
import styles from './styles.module.scss';

import Routes from '~constants/routes';
import { actionCreators as authActions } from '~redux/Auth/actions';
import LocalStorageService from '~services/LocalStorageService';

function Navbar({ logout }) {
  const userData = LocalStorageService.getSessionToken();
  return (
    <nav className={`row space-between center ${styles.navbar}`}>
      <h2 className={`title ${styles.title}`}>Hola, {userData.username}</h2>
      <div className={`row ${styles.containerLinks}`}>
        <NavLink
          to={Routes.HOME}
          className={`row middle subtitle m-right-4 ${styles.link}`}
          activeClassName={styles.active}
        >
          <IcTour className={`m-right-1 ${styles.icon}`} />
          {t('Navbar:home')}
        </NavLink>
        <NavLink
          to={Routes.PROFILE}
          className={`row middle subtitle ${styles.link}`}
          activeClassName={styles.active}
        >
          <IcHome className={`m-right-1 ${styles.icon}`} />
          {t('Navbar:profile')}
        </NavLink>
        <button
          type="button"
          className={`row middle subtitle ${styles.link} ${styles.logout}`}
          onClick={logout}
        >
          <i className="fas fa-sign-out-alt m-right-1" />
          {t('Navbar:getOut')}
        </button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  logout: func.isRequired
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Navbar);
