import React, { Component } from 'react';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import logo from '../../assets/girl_alert.svg';

import styles from './styles.module.scss';
import { MOCK_TIME_SHOW } from './constants';

import Modal from '~components/Modal';
import { actionCreators as modalActions } from '~redux/Modal/actions';

class InformationModal extends Component {
  componentDidMount() {
    const { closeModal, openModal } = this.props;
    closeModal();
    setTimeout(() => {
      openModal();
    }, MOCK_TIME_SHOW);
  }

  render() {
    const { closeModal } = this.props;

    return (
      <Modal>
        <div className="column center text-center">
          <span className="subtitle text-center m-bottom-4">{t('Trip:modalInfo')}</span>
          <img className={`m-bottom-3 ${styles.img}`} src={logo} alt="" />
          <span className="subtitle-bold m-bottom-2">{t('Trip:modalWarningInfo')}</span>
          <p className="base-text m-bottom-5">{t('Trip:modalInfoRecomendation')}</p>
          <button type="button" className="full-width primary-button" onClick={closeModal}>
            {t('Home:ok')}
          </button>
        </div>
      </Modal>
    );
  }
}

InformationModal.propTypes = {
  closeModal: func.isRequired,
  openModal: func.isRequired
};

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch(modalActions.openModal()),
  closeModal: () => dispatch(modalActions.closeModal())
});

export default connect(
  null,
  mapDispatchToProps
)(InformationModal);
