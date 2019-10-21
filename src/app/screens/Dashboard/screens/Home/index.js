import React from 'react';
import { Chart } from 'react-google-charts';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { NavLink } from 'react-router-dom';

import Card from './components/Card';
import { GRAPHIC_DATA, GRAPHIC_COLORS, DAYS } from './constants';
import styles from './styles.module.scss';
import city from './assets/city.svg';
import bancolombiaLogo from './assets/bancolombia-logo.png';
import manPhoto from './assets/man.jpg';

import Modal from '~components/Modal';
import Routes from '~constants/routes';
import { actionCreators as modalActions } from '~redux/Modal/actions';
import LocalStorageService from '~services/LocalStorageService';

function Home({ openModal, closeModal }) {
  const userData = LocalStorageService.getSessionToken();

  return (
    <>
      <div className={styles.container}>
        <div className={`column center full-width text-center m-bottom-2 ${styles.header}`}>
          <img className={styles.logo} src={bancolombiaLogo} alt="" />
          <img className={`m-bottom-3 ${styles.profilePhoto}`} src={manPhoto} alt="" />
          <span className="subtitle-bold m-bottom-3">{userData.username}</span>
          <div className="row space-between m-bottom-6">
            <span className="base-text m-right-8">
              {t('Home:route')} <span className="bold m-left-3">120 km</span>
            </span>
            <span className="base-text">
              {t('Home:time')} <span className="bold m-left-3">85 {t('Home:hours')}</span>
            </span>
          </div>
          <div className="row wrap space-arouns">
            {DAYS.map(el => (
              <span key={el} className={`base-text m-bottom-2 m-right-2 row middle ${styles.chip}`}>
                {el}
              </span>
            ))}
          </div>
        </div>
        <Chart
          className={styles.chart}
          chartType="PieChart"
          data={GRAPHIC_DATA}
          options={{
            pieHole: 0.5,
            colors: GRAPHIC_COLORS,
            legend: 'none',
            height: 400
          }}
          rootProps={{ 'data-testid': '3' }}
        />
        <Card />
        <div className={`row center ${styles.buttonContainer}`}>
          <button
            type="button"
            className={`button primary-button ${styles.customButton}`}
            onClick={openModal}
          >
            {t('Home:startTrip')}
          </button>
        </div>
      </div>
      <Modal noPaddingX>
        <div className={`column center middle ${styles.modalContainer}`}>
          <h3 className={`subtitle-bold text-center cod-gray-color ${styles.modalTitle}`}>
            {t('Home:modalTitle')}
          </h3>
          <img src={city} alt="" className="m-bottom-4 full-width" />
          <div className="column center m-right-4 m-left-4">
            <p className="base-text text-center m-bottom-8">{t('Home:modalInfoText')}</p>
            <div className="column full-width m-bottom-2">
              <NavLink to={Routes.TRIP} className="button primary-button text-center m-bottom-5">
                {t('Home:ok')}
              </NavLink>
              <button type="button" className="secondary-button" onClick={closeModal}>
                {t('Home:close')}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

Home.propTypes = {
  closeModal: func.isRequired,
  openModal: func.isRequired
};

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch(modalActions.openModal()),
  closeModal: () => dispatch(modalActions.closeModal())
});

export default connect(
  null,
  mapDispatchToProps
)(Home);
