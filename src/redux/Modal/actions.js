import { createTypes, completeTypes } from 'redux-recompose';

import { MODAL_TARGET } from './constants';

export const actions = createTypes(completeTypes([], ['OPEN_MODAL', 'CLOSE_MODAL']), '@@MODAL');

export const actionCreators = {
  openModal: modalName => ({
    type: actions.OPEN_MODAL,
    target: modalName || MODAL_TARGET
  }),
  closeModal: modalName => ({
    type: actions.CLOSE_MODAL,
    target: modalName || MODAL_TARGET
  })
};
