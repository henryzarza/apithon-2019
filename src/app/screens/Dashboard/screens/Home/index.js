import React from 'react';
import { Chart } from 'react-google-charts';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { NavLink } from 'react-router-dom';

import { GRAPHIC_DATA, GRAPHIC_COLORS } from './constants';
import styles from './styles.module.scss';
import city from './assets/city.svg';

import Modal from '~components/Modal';
import Routes from '~constants/routes';
import { actionCreators as modalActions } from '~redux/Modal/actions';
import LocalStorageService from '~services/LocalStorageService';

function Home({ openModal, closeModal }) {
  const userData = LocalStorageService.getSessionToken();

  return (
    <>
      <div className={`column center ${styles.container}`}>
        <h3 className={`title-small full-width text-center m-bottom-6 ${styles.title}`}>
          {userData.username}
        </h3>
        <p className="base-text m-bottom-4">{t('Profile:textExplanation')}</p>
        <Chart
          className={styles.chart}
          chartType="PieChart"
          data={GRAPHIC_DATA}
          options={{
            pieHole: 0.4,
            colors: GRAPHIC_COLORS,
            legend: 'none'
          }}
          rootProps={{ 'data-testid': '3' }}
        />
        <button type="button" className="button primary-button" onClick={openModal}>
          {t('Home:startTrip')}
        </button>
      </div>
      <Modal>
        <div className="column center middle full-height">
          <h3 className="subtitle m-bottom-8">{t('Home:modalTitle')}</h3>
          <img src={city} alt="" className={`m-bottom-8 ${styles.modalImg}`} />
          <p className="base-text m-bottom-8">{t('Home:modalInfoText')}</p>
          <div className="column full-width m-bottom-4">
            <NavLink to={Routes.TRIP} className="button primary-button text-center m-bottom-5">
              {t('Home:ok')}
            </NavLink>
            <button type="button" className="secondary-button" onClick={closeModal}>
              {t('Home:close')}
            </button>
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
