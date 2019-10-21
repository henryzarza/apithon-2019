import React, { Component, createRef } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import cn from 'classnames';
import { shape, arrayOf } from 'prop-types';

import styles from './styles.module.scss';
import { GOOGLE_MAPS_API_KEY, DEFAULT_ZOOM, DEFAULT_CENTER } from './constants';
import { getMarkerIcon } from './utils';
import mapStyles from './map-styles';

import LocalStorageService from '~services/LocalStorageService';

class Map extends Component {
  mapRef = createRef();

  componentDidUpdate(prevProp) {
    const { currentLocation } = this.props;
    if (JSON.stringify(currentLocation) !== JSON.stringify(prevProp.currentLocation) && this.mapRef) {
      this.mapRef.current.panTo(currentLocation);
    }
  }

  render() {
    const { currentLocation, children, measurements } = this.props;
    const { Animation } = window.google.maps;
    const userData = LocalStorageService.getSessionToken();

    return (
      <GoogleMap
        ref={this.mapRef}
        defaultZoom={DEFAULT_ZOOM}
        defaultCenter={DEFAULT_CENTER}
        defaultOptions={{
          styles: mapStyles,
          streetViewControl: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: false,
          rotateControl: false,
          fullscreenControl: false,
          zoomControl: false
        }}
      >
        {measurements &&
          measurements.map(el => (
            <Marker
              key={el.id}
              icon={getMarkerIcon(el.polutionLevel.label)}
              position={{ lat: el.latitude, lng: el.longitude }}
              animation={Animation.DROP}
              title={`${el.town} - ${el.name}`}
            />
          ))}
        {currentLocation && (
          <Marker title={userData.username} position={currentLocation} animation={Animation.DROP} />
        )}
        {children}
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  currentLocation: shape(),
  measurements: arrayOf(shape())
};

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`,
    loadingElement: <div className={styles.loading} />,
    containerElement: <div className={cn(styles.container)} />,
    mapElement: <div className={styles.map} />
  }),
  withScriptjs,
  withGoogleMap
)(Map);
