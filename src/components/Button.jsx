/* eslint-disable react/prop-types */
import styles from './Button.module.css';

function Button({ children, onClick, type }) {
  return (
    <button
      className={`${styles.btn} ${
        type === 'back'
          ? styles.back
          : styles.primary
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
