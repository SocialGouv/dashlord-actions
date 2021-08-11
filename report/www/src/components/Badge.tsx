import classNames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as H from 'history';

import styles from './badge.cssmodule.scss';

type BadgeProps = {
  variant: string,
  className?: string,
  to?: H.LocationDescriptor<unknown>;
};

const Badge : React.FC<BadgeProps> = ({
  children, variant, className, to,
}) => {
  const history = useHistory();
  return (
    <button
      type="button"
      className={classNames(className, styles[variant])}
      onClick={() => {
        if (to) {
          history.push(to);
        }
      }}
    >
      {children}
    </button>
  );
};

export default Badge;
