import {
  MARKER_HEIGHT,
  MARKER_OFFSET_HORIZONTAL,
  MARKER_OFFSET_VERTICAL,
  MARKER_WIDTH,
  POLUTION_LEVELS_PM_25
} from './constants';
import cloud1 from './assets/cloud-1.svg';
import cloud2 from './assets/cloud-2.svg';
import cloud3 from './assets/cloud-3.svg';
import cloud4 from './assets/cloud-4.svg';
import cloud5 from './assets/cloud-5.svg';

export const getMarkerIcon = state => {
  const { Size, Point } = window.google.maps;
  const iconMarker = {
    scaledSize: new Size(MARKER_HEIGHT, MARKER_WIDTH),
    anchor: new Point(MARKER_WIDTH / 2 + MARKER_OFFSET_HORIZONTAL, MARKER_HEIGHT + MARKER_OFFSET_VERTICAL)
  };
  switch (state) {
    case POLUTION_LEVELS_PM_25.GOOD:
      iconMarker.url = cloud1;
      break;
    case POLUTION_LEVELS_PM_25.MODERATE:
      iconMarker.url = cloud2;
      break;
    case POLUTION_LEVELS_PM_25.SLIGHTLY_HARMFUL:
      iconMarker.url = cloud3;
      break;
    case POLUTION_LEVELS_PM_25.MODERATELY_HARMFUL:
      iconMarker.url = cloud4;
      break;
    default:
      iconMarker.url = cloud5;
      break;
  }
  return iconMarker;
};
