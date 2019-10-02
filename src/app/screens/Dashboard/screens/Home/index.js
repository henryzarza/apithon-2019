import React, { Component } from 'react';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import GoogleMap from './components/GoogleMap';
import Notification from './components/Notification';
import { ERROR_TEXTS, DEFAULT_TIME_SHOW_NOTI, TRANSPORTATION_TYPES } from './constants';
import styles from './styles.module.scss';

import Modal from '~components/Modal';
import Checkbox from '~components/Checkbox';
import { actionCreators as modalActions } from '~redux/Modal/actions';

class Home extends Component {
  state = { currentLocation: null, showNotification: false, errorMessage: null };

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({
          currentLocation: { lat: location.coords.latitude, lng: location.coords.longitude }
        });
      }, this.showError);
    }
  };

  showError = error => {
    this.setState(
      {
        showNotification: true,
        errorMessage: ERROR_TEXTS[error.code] || t('Home:UNKNOWN')
      },
      this.hiddenNotification()
    );
  };

  hiddenNotification = () => {
    setTimeout(() => {
      this.setState({
        showNotification: false
      });
    }, DEFAULT_TIME_SHOW_NOTI);
  };

  render() {
    const { showNotification, errorMessage, currentLocation } = this.state;
    const { openModal, closeModal } = this.props;
    return (
      <>
        <Notification message={errorMessage} isVisible={showNotification} />
        <GoogleMap currentLocation={currentLocation}>
          <div className={`column ${styles.container}`}>
            <span className="base-text m-bottom-2">{t('Home:checkboxTitle')}</span>
            <div className="row space-around m-bottom-4">
              {TRANSPORTATION_TYPES.map(el => (
                <Checkbox
                  key={el.id}
                  id={el.id}
                  className="m-right-1"
                  label={el.label}
                  name={el.name}
                  type="radio"
                  value={el.id}
                  icon={el.icon}
                />
              ))}
            </div>
            <button type="button" className="primary-button" onClick={openModal}>
              {t('Home:startTrip')}
            </button>
          </div>
        </GoogleMap>
        <Modal>
          <div className="row">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil architecto beatae porro labore
            ipsa! Incidunt labore quo quia porro placeat cum? Voluptates asperiores quos adipisci consequuntur
            facere rem odio illo.
            <div className="column">
              <button type="button" className="secondary-button" onClick={closeModal}>
                {t('Home:close')}
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
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
