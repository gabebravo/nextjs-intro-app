import styles from '../styles/alert.module.css';
import cn from 'classnames';
import React from 'react';

export default function AlertToggle() {
  const [alert, setAlert] = React.useState(false);
  const handleClick = () => setAlert((prevState) => !prevState);

  return (
    <div>
      <div>
        <span
          className={cn({
            [styles.success]: alert,
            [styles.error]: !alert,
          })}
        >
          This is the alert message
        </span>
      </div>
      <div>
        <button onClick={handleClick}>toggle</button>
      </div>
    </div>
  );
}
