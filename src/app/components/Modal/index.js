import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { func, bool, string } from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

import { MODAL_TARGET } from '~redux/Modal/constants';

function Modal({ children, isOpen, className }) {
  return (
    isOpen &&
    ReactDOM.createPortal(
      <div className={`row middle center full-width ${styles.backDropModal}`}>
        <div className={cn(`column ${styles.modalContent}`, className)}>{children}</div>
      </div>,
      document.body
    )
  );
}

Modal.propTypes = {
  className: string,
  handleClickSuccess: func,
  hideCloseButton: bool,
  isDelete: bool,
  isOpen: bool,
  successButtonText: string
};

const mapStateToProps = (state, ownProps) => ({
  isOpen: state.modal[ownProps.modalName || MODAL_TARGET]
});

export default connect(mapStateToProps)(Modal);
