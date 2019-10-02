import { completeTypes, createTypes } from 'redux-recompose';

import { NEAREST_TARGET, MEASUREMENTS_TARGET } from './constants';

import HomeService from '~services/HomeService';

const completedTypes = completeTypes(['GET_NEAREST', 'GET_MEASUREMENTS']);

export const actions = createTypes(completedTypes, '@@HOME');

export const actionCreators = {
  getNearest: data => ({
    type: actions.GET_NEAREST,
    target: NEAREST_TARGET,
    service: HomeService.nearest,
    payload: data,
    successSelector: response => response.data
  }),
  getMeasurements: () => ({
    type: actions.GET_MEASUREMENTS,
    target: MEASUREMENTS_TARGET,
    service: HomeService.measurements,
    successSelector: response => response.data.cloudsMeasurements
  })
};
