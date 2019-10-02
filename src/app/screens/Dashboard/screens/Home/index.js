import React, { Component } from 'react';
import { t } from 'i18next';

import GoogleMap from './components/GoogleMap';
import Notification from './components/Notification';
import { ERROR_TEXTS, DEFAULT_TIME_SHOW_NOTI } from './constants';

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
    return (
      <>
        <Notification message={errorMessage} isVisible={showNotification} />
        <GoogleMap currentLocation={currentLocation}>
          <div className="row">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro eius, rerum, quas itaque deserunt
            animi fugiat, ea delectus eveniet eligendi debitis. Hic, aliquam nulla recusandae natus in
            blanditiis quia facere.Soluta nobis porro quaerat quibusdam amet totam quo. Quidem ea dicta odio,
            corrupti non ab nulla, dolorem laborum excepturi libero necessitatibus aliquid nemo similique quos
            voluptates quod voluptatum praesentium quisquam?
          </div>
        </GoogleMap>
      </>
    );
  }
}

export default Home;
