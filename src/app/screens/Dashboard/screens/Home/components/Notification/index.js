import React from 'react';
import cn from 'classnames';
import { string, bool } from 'prop-types';

import styles from './styles.module.scss';

function Notification({ message, isVisible }) {
  return <div className={cn(styles.container, { [styles.visible]: isVisible })}>{message}</div>;
}

Notification.propTypes = {
  isVisible: bool,
  message: string
};

export default Notification;
