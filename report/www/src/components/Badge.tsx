import classNames from 'classnames';
import React from 'react';

import styles from './badge.cssmodule.scss';

const Badge = ({ children, variant, className }) => (
  <div className={classNames(className, styles[variant])}>
    {children}
  </div>
);

export default Badge;
