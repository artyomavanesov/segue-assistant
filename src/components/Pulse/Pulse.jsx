import classNames from 'classnames';
import React from 'react';

import styles from './Pulse.module.scss';

export const Pulse = (props) => {
  const { session } = props;

  const style = classNames(styles.component, {
    [styles.stateIdle]: !session.assistantMessage && !session.isLoading,
    [styles.stateInitiating]: !session.assistantMessage && session.isLoading,
    [styles.stateActive]: session.assistantMessage && !session.isLoading,
    [styles.stateLoading]: session.assistantMessage && session.isLoading,
    [styles.stateError]: session.error
  });

  return <div className={style} />;
};
