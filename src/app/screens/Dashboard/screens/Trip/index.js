import React, { Component } from 'react';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { func, arrayOf, shape } from 'prop-types';
import { NavLink } from 'react-router-dom';

import InformationModal from './components/InformationModal';
import GoogleMap from './components/GoogleMap';
import Notification from './components/Notification';
import { ERROR_TEXTS, DEFAULT_TIME_SHOW_NOTI, TRANSPORTATION_TYPES } from './constants';
import styles from './styles.module.scss';

import Routes from '~constants/routes';
import Checkbox from '~components/Checkbox';
import { actionCreators as homeActions } from '~redux/Home/actions';
import { MEASUREMENTS_TARGET } from '~redux/Home/constants';

class Trip extends Component {
  state = { currentLocation: null, showNotification: false, errorMessage: null };

  componentDidMount() {
    this.props.getMeasurements();
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
    const { measurements } = this.props;
    return (
      <>
        <InformationModal />
        <Notification message={errorMessage} isVisible={showNotification} />
        <GoogleMap currentLocation={currentLocation} measurements={measurements}>
          <div className={`column ${styles.container}`}>
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
            <NavLink to={Routes.HOME} className="button primary-button text-center">
              {t('Trip:finish')}
            </NavLink>
          </div>
        </GoogleMap>
      </>
    );
  }
}

Trip.propTypes = {
  getMeasurements: func.isRequired,
  measurements: arrayOf(shape())
};

const mapStateToProps = store => ({
  measurements: store.home[MEASUREMENTS_TARGET]
});

const mapDispatchToProps = dispatch => ({
  getMeasurements: () => dispatch(homeActions.getMeasurements())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trip);
