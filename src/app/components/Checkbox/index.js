import React, { Component } from 'react';
import { string, func, oneOfType, number } from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

class Checkbox extends Component {
  handleChange = event => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event);
    }
  };

  render() {
    const { className, label, name, id, type, value, icon: Icon } = this.props;

    return (
      <div className={cn(styles.checkboxContainer, className)}>
        <input
          className={styles.checkbox}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={this.handleChange}
        />
        {label && (
          <label className={`column middle center ${styles.checkboxLabel}`} htmlFor={id}>
            <span className={`row middle center m-bottom-1 ${styles.iconContainer}`}>
              <Icon className={styles.icon} />
            </span>
            <span className="label-text">{label}</span>
          </label>
        )}
      </div>
    );
  }
}

Checkbox.defaultProps = {
  className: '',
  type: 'checkbox'
};

Checkbox.propTypes = {
  className: string,
  icon: string,
  id: string,
  label: string,
  name: string,
  type: string,
  value: oneOfType([string, number]),
  onChange: func
};

export default Checkbox;
