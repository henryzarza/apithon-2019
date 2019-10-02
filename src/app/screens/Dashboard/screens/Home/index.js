import React, { Component } from 'react';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { func, arrayOf, shape } from 'prop-types';
import cn from 'classnames';

import GoogleMap from './components/GoogleMap';
import Notification from './components/Notification';
import { ERROR_TEXTS, DEFAULT_TIME_SHOW_NOTI, TRANSPORTATION_TYPES, TIME_GET_NEAREST } from './constants';
import styles from './styles.module.scss';
import city from './assets/city.svg';

import Modal from '~components/Modal';
import Checkbox from '~components/Checkbox';
import { actionCreators as modalActions } from '~redux/Modal/actions';
import { actionCreators as homeActions } from '~redux/Home/actions';
import { NEAREST_TARGET, MEASUREMENTS_TARGET } from '~redux/Home/constants';

class Home extends Component {
  state = { currentLocation: null, showNotification: false, errorMessage: null, transportTypeOpen: false };

  componentDidMount() {
    this.getCurrentLocation();
    this.props.getMeasurements();
  }

  getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState(
          {
            currentLocation: { lat: location.coords.latitude, lng: location.coords.longitude }
          },
          this.subscribeGetNearest()
        );
      }, this.showError);
    }
  };

  subscribeGetNearest = () => {
    this.interval = setInterval(() => {
      this.props.getNearest(this.state.currentLocation);
    }, TIME_GET_NEAREST);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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

  handleStartTrip = () => {
    // TODO do something here
    this.props.closeModal();
  };

  handleClickTypes = () => this.setState(prevState => ({ transportTypeOpen: !prevState.transportTypeOpen }));

  render() {
    const { showNotification, errorMessage, currentLocation, transportTypeOpen } = this.state;
    const { openModal, closeModal, measurements } = this.props;
    return (
      <>
        <Notification message={errorMessage} isVisible={showNotification} />
        <GoogleMap currentLocation={currentLocation} measurements={measurements}>
          <div
            className={cn(`column ${styles.container}`, { [styles.open]: transportTypeOpen })}
            onClick={this.handleClickTypes}
          >
            <span className="base-text bold m-bottom-2">{t('Home:checkboxTitle')}</span>
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
            <button type="button" className={`primary-button ${styles.btnInside}`} onClick={openModal}>
              {t('Home:startTrip')}
            </button>
          </div>
          <div className={`row center middle ${styles.containerHidden}`}>
            <button type="button" className="primary-button" onClick={openModal}>
              {t('Home:startTrip')}
            </button>
          </div>
        </GoogleMap>
        <Modal>
          <div className="column center middle full-height">
            <h3 className="subtitle m-bottom-8">{t('Home:modalTitle')}</h3>
            <img src={city} alt="" className={`m-bottom-8 ${styles.modalImg}`} />
            <p className="base-text m-bottom-8">{t('Home:modalInfoText')}</p>
            <div className="column full-width m-bottom-4">
              <button type="button" className="primary-button m-bottom-5" onClick={this.handleStartTrip}>
                {t('Home:ok')}
              </button>
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
  getMeasurements: func.isRequired,
  getNearest: func.isRequired,
  openModal: func.isRequired,
  measurements: arrayOf(shape())
};

const mapStateToProps = store => ({
  nearest: store.home[NEAREST_TARGET],
  measurements: store.home[MEASUREMENTS_TARGET]
});

const mapDispatchToProps = dispatch => ({
  getNearest: data => dispatch(homeActions.getNearest(data)),
  getMeasurements: () => dispatch(homeActions.getMeasurements()),
  openModal: () => dispatch(modalActions.openModal()),
  closeModal: () => dispatch(modalActions.closeModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
