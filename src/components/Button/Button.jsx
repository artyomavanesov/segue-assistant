import classNames from 'classnames';
import React from 'react';

import styles from './Button.module.scss';
import { Icon } from '../Icon';

export const Button = (props) => {
  const { disabled, form, icon, isLoading, label, onClick, type, variant = 'primary' } = props;

  const renderContent = () => {
    if (isLoading) return 'Loading...';
    if (variant === 'icon') return <Icon icon={icon} />;
    return label;
  };

  const componentClass = classNames(styles.component, {
    [styles.variantPrimary]: variant === 'primary',
    [styles.variantIcon]: variant === 'icon'
  });

  return (
    <button
      className={componentClass}
      disabled={disabled}
      form={form}
      onClick={onClick}
      type={type}
    >
      {renderContent()}
    </button>
  );
};
