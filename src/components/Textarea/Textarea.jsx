import React from 'react';

import styles from './Textarea.module.scss';

export const Textarea = (props) => {
  const { form, label, onChange, placeholder, rows, type, value } = props;

  return (
    <div className={styles.component}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={styles.textarea}
        form={form}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        spellCheck="false"
        type={type}
        value={value}
      />
    </div>
  );
};
