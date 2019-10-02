import { t } from 'i18next';

import { ReactComponent as Aerial } from './assets/aerial.svg';
import { ReactComponent as Bike } from './assets/bicycle.svg';
import { ReactComponent as Bus } from './assets/bus.svg';
import { ReactComponent as Subway } from './assets/subway.svg';
import { ReactComponent as Tram } from './assets/tram.svg';

const ERORR_CODES = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3
};

export const ERROR_TEXTS = {
  [ERORR_CODES.PERMISSION_DENIED]: t('Home:PERMISSION_DENIED'),
  [ERORR_CODES.POSITION_UNAVAILABLE]: t('Home:POSITION_UNAVAILABLE'),
  [ERORR_CODES.TIMEOUT]: t('Home:TIMEOUT')
};

export const DEFAULT_TIME_SHOW_NOTI = 3000;

export const TIME_GET_NEAREST = 10000;

export const TRANSPORTATION_TYPES = [
  {
    id: 'bici',
    label: 'EnBici',
    name: 'transportationType',
    icon: Bike
  },
  {
    id: 'metroplus',
    label: 'Metroplus',
    name: 'transportationType',
    icon: Bus
  },
  {
    id: 'metro',
    label: 'Metro',
    name: 'transportationType',
    icon: Subway
  },
  {
    id: 'metrocable',
    label: 'Metro cable',
    name: 'transportationType',
    icon: Aerial
  },
  {
    id: 'tranvia',
    label: 'Tranvía',
    name: 'transportationType',
    icon: Tram
  }
];
