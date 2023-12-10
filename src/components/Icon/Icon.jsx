import classNames from 'classnames';
import React from 'react';

import styles from './Icon.module.scss';

export const Icon = (props) => {
  const { color, icon } = props;

  const iconClass = classNames(styles.component, {
    [styles.color0]: color === 0 || !color,
    [styles.color1]: color === 1,
    [styles.color2]: color === 2
  });

  return (
    <svg
      className={iconClass}
      viewBox="0 0 24 24"
    >
      <path d={icons[icon]} />
    </svg>
  );
};

const icons = {
  close: 'M4.92849 4.92893C4.53796 5.31946 4.53797 5.95262 4.92849 6.34315L10.5853 12L4.92849 17.6569C4.53797 18.0474 4.53796 18.6805 4.92849 19.0711C5.31901 19.4616 5.95218 19.4616 6.3427 19.0711L11.9996 13.4142L17.6564 19.0711C18.0469 19.4616 18.6801 19.4616 19.0706 19.0711C19.4611 18.6805 19.4611 18.0474 19.0706 17.6569L13.4138 12L19.0706 6.34315C19.4611 5.95262 19.4611 5.31946 19.0706 4.92893C18.6801 4.53841 18.0469 4.53841 17.6564 4.92893L11.9996 10.5858L6.3427 4.92893C5.95218 4.53841 5.31901 4.53841 4.92849 4.92893Z',
  configuration: 'M17 3H15V9H17V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17V3ZM3 6C3 5.44772 3.44772 5 4 5H12C12.5523 5 13 5.44772 13 6C13 6.55228 12.5523 7 12 7H4C3.44772 7 3 6.55228 3 6ZM3 18C3 17.4477 3.44772 17 4 17H9C9.55228 17 10 17.4477 10 18C10 18.5523 9.55228 19 9 19H4C3.44772 19 3 18.5523 3 18ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H12ZM21 18C21 17.4477 20.5523 17 20 17H14V15H12V21H14V19H20C20.5523 19 21 18.5523 21 18ZM3 12C3 11.4477 3.44772 11 4 11H7V9H9V15H7V13H4C3.44772 13 3 12.5523 3 12Z',
  github: 'M11.9642 0C5.34833 0 0 5.5 0 12.3042C0 17.7432 3.42686 22.3472 8.18082 23.9767C8.77518 24.0992 8.9929 23.712 8.9929 23.3862C8.9929 23.101 8.97331 22.1232 8.97331 21.1045C5.64514 21.838 4.95208 19.6378 4.95208 19.6378C4.41722 18.2118 3.62473 17.8452 3.62473 17.8452C2.53543 17.0915 3.70408 17.0915 3.70408 17.0915C4.91241 17.173 5.54645 18.3545 5.54645 18.3545C6.61592 20.2285 8.33927 19.699 9.03257 19.373C9.13151 18.5785 9.44865 18.0285 9.78539 17.723C7.13094 17.4377 4.33812 16.3785 4.33812 11.6523C4.33812 10.3078 4.81322 9.20775 5.56604 8.35225C5.44727 8.04675 5.03118 6.7835 5.68506 5.09275C5.68506 5.09275 6.69527 4.76675 8.97306 6.35575C9.94827 6.08642 10.954 5.9494 11.9642 5.94825C12.9744 5.94825 14.0042 6.091 14.9552 6.35575C17.2332 4.76675 18.2434 5.09275 18.2434 5.09275C18.8973 6.7835 18.481 8.04675 18.3622 8.35225C19.1349 9.20775 19.5904 10.3078 19.5904 11.6523C19.5904 16.3785 16.7976 17.4172 14.1233 17.723C14.5592 18.11 14.9353 18.8432 14.9353 20.0045C14.9353 21.6545 14.9158 22.9787 14.9158 23.386C14.9158 23.712 15.1337 24.0992 15.7278 23.977C20.4818 22.347 23.9087 17.7432 23.9087 12.3042C23.9282 5.5 18.5603 0 11.9642 0Z'
};
