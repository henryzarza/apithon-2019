import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import cn from 'classnames';
import { shape } from 'prop-types';

import person from './walk.svg';
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

class Map extends Component {
  mapRef = {};

  setMapRef = map => (this.mapRef = map);

  handleIdle = () => {
    /* const { searchInMap, searchInMovement } = this.props;
    if (searchInMovement) {
      const bounds: any = this.mapRef.getBounds();
      const center: any = bounds.getCenter();
      const northEast: any = bounds.getSouthWest();
      searchInMap(`${center.lng()},${center.lat()},${getDistance(center, northEast)}`);
    } */
  };

  render() {
    const { currentLocation, children } = this.props;
    const defaultCenter = currentLocation || { lat: 6.2486, lng: -75.56359 };
    const { Size, Point } = window.google.maps;
    const ICON_MARKER = {
      url: person,
      scaledSize: new Size(MARKER_HEIGHT, MARKER_WIDTH),
      anchor: new Point(MARKER_WIDTH / 2 + MARKER_OFFSET_HORIZONTAL, MARKER_HEIGHT + MARKER_OFFSET_VERTICAL)
    };

    return (
      <GoogleMap
        ref={this.setMapRef}
        onIdle={this.handleIdle}
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
        <Marker icon={ICON_MARKER} position={defaultCenter} />
        {children}
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  currentLocation: shape()
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
