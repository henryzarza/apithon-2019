import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import cn from 'classnames';
import { shape, arrayOf } from 'prop-types';

import person from '../../assets/pin.svg';
import cloud from '../../assets/cloud.svg';
import redCloud from '../../assets/redCloud.svg';

import styles from './styles.module.scss';
import mapStyles from './map-styles';
import {
  GOOGLE_MAPS_API_KEY,
  DEFAULT_ZOOM,
  MARKER_HEIGHT,
  MARKER_OFFSET_HORIZONTAL,
  MARKER_OFFSET_VERTICAL,
  MARKER_WIDTH
} from './constants';

import LocalStorageService from '~services/LocalStorageService';

class Map extends Component {
  render() {
    const { currentLocation, children, measurements } = this.props;
    const defaultCenter = currentLocation || { lat: 6.2486, lng: -75.56359 };
    const { Size, Point, Animation } = window.google.maps;
    const ICON_MARKER = {
      scaledSize: new Size(MARKER_HEIGHT, MARKER_WIDTH),
      anchor: new Point(MARKER_WIDTH / 2 + MARKER_OFFSET_HORIZONTAL, MARKER_HEIGHT + MARKER_OFFSET_VERTICAL)
    };
    const userData = LocalStorageService.getSessionToken();

    return (
      <GoogleMap
        ref={this.setMapRef}
        defaultZoom={DEFAULT_ZOOM}
        defaultCenter={defaultCenter}
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
              icon={{ url: el.active ? cloud : redCloud, ...ICON_MARKER }}
              position={{ lat: el.latitude, lng: el.longitude }}
              animation={Animation.DROP}
              title={`${el.town} - ${el.name}`}
            />
          ))}
        <Marker
          title={userData.username}
          icon={{ url: person, ...ICON_MARKER }}
          position={defaultCenter}
          animation={Animation.DROP}
        />
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
