import styles from './Button.module.css';

function Button({ children, handler }) {
  return (
    <button
      className={`${styles.btn} ${styles.primary}`}
      onClick={(e) => handler(e)}
    >
      {children}
    </button>
  );
}

export default Button;
