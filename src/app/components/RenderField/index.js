import React from 'react';
import { bool, string, shape } from 'prop-types';
import cn from 'classnames';

import InputLabel from '../InputLabel';

import styles from './styles.module.scss';

function RenderField({ input, className, meta: { touched, error }, ...props }) {
  return (
    <div className={`column start ${className}`}>
      <InputLabel
        inputClassName={cn('m-botom-1', { [styles.error]: touched && error })}
        {...input}
        {...props}
      />
      {touched && error && <span className="label-text carnation-color">{error}</span>}
    </div>
  );
}

RenderField.propTypes = {
  className: string,
  input: shape(),
  meta: shape({
    touched: bool,
    error: string
  })
};

RenderField.defaultProps = {
  className: ''
};

export default RenderField;
