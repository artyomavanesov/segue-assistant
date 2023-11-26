import React from 'react';

import styles from './Button.module.scss';

export const Button = (props) => {
  const { disabled, form, label, onClick, type } = props;

  return (
    <button
      className={styles.component}
      disabled={disabled}
      form={form}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};
