import React from 'react';
import styles from './card.cssmodule.scss';

const Card = ({ children, title, value }) => (
  <div className={styles.card}>
    {children}
    {title && (
    <div className={styles.cardTitle}>
      {title}
    </div>
    )}
    {value && (
    <div className={styles.cardValue}>
      {value}
    </div>
    )}
  </div>
);

export default Card;
