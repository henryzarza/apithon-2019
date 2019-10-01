import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function InputLabel({ label, inputClassName, inputId, ...props }) {
  return (
    <>
      <label className="label-text m-bottom-1" htmlFor={inputId}>
        {label}
      </label>
      <input
        className={`full-width ${styles.input} ${inputClassName}`}
        id={inputId}
        autoComplete="off"
        {...props}
      />
    </>
  );
}

InputLabel.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputClassName: PropTypes.string
};

InputLabel.defaultProps = {
  inputClassName: ''
};

export default InputLabel;
