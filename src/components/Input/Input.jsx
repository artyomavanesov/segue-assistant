import React from 'react';

import styles from './Input.module.scss';

export const Input = (props) => {
  const { onChange, placeholder, type, value } = props;

  return (
    <input
      className={styles.component}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};
