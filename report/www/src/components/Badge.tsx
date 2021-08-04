import classNames from 'classnames';
import React from 'react';

import styles from './badge.cssmodule.scss';

type BadgeProps = {
  variant: string,
  className?: string,
};

const Badge : React.FC<BadgeProps> = ({ children, variant, className }) => (
  <div className={classNames(className, styles[variant])}>
    {children}
  </div>
);

export default Badge;
