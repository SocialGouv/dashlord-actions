import React from "react";
import styles from "./card.module.scss";

type CardProps = {
  title?: string | React.ReactNode;
  value?: string | React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children, title, value }) => (
  <div className={styles.card}>
    {children}
    {title && <div className={styles.cardTitle}>{title}</div>}
    {value && <div className={styles.cardValue}>{value}</div>}
  </div>
);

export default Card;
