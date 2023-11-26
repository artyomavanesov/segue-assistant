import classNames from 'classnames';
import React from 'react';

import styles from './Pulse.module.scss';

export const Pulse = (props) => {
  const { session } = props;

  const style = classNames(styles.component, {
    [styles.idle]: !session.assistantMessage && !session.isLoading,
    [styles.initiating]: !session.assistantMessage && session.isLoading,
    [styles.active]: session.assistantMessage && !session.isLoading,
    [styles.loading]: session.assistantMessage && session.isLoading,
    [styles.error]: session.error
  });

  return <div className={style} />;
};
