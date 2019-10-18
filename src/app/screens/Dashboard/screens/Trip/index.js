import React, { Component } from 'react';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { func, arrayOf, shape } from 'prop-types';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import GoogleMap from './components/GoogleMap';
import Notification from './components/Notification';
import { ERROR_TEXTS, DEFAULT_TIME_SHOW_NOTI, TRANSPORTATION_TYPES, TIME_GET_NEAREST } from './constants';
import styles from './styles.module.scss';

import Routes from '~constants/routes';
import Checkbox from '~components/Checkbox';
import { actionCreators as homeActions } from '~redux/Home/actions';
import { NEAREST_TARGET, MEASUREMENTS_TARGET } from '~redux/Home/constants';

class Trip extends Component {
  state = { currentLocation: null, showNotification: false, errorMessage: null, transportTypeOpen: false };

  componentDidMount() {
    this.props.getMeasurements();
    this.getCurrentLocation();
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

  handleClickTypes = () => this.setState(prevState => ({ transportTypeOpen: !prevState.transportTypeOpen }));

  render() {
    const { showNotification, errorMessage, currentLocation, transportTypeOpen } = this.state;
    const { measurements } = this.props;
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
  getNearest: func.isRequired,
  measurements: arrayOf(shape())
};

const mapStateToProps = store => ({
  nearest: store.home[NEAREST_TARGET],
  measurements: store.home[MEASUREMENTS_TARGET]
});

const mapDispatchToProps = dispatch => ({
  getNearest: data => dispatch(homeActions.getNearest(data)),
  getMeasurements: () => dispatch(homeActions.getMeasurements())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trip);
