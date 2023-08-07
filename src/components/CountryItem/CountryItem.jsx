import styles from "./CountryItem.module.css";

function CountryItem({ countryData }) {
  const { emoji, country } = countryData;

  return (
    <li className={styles.countryItem}>
      <img src={emoji} className={styles.emoji} alt={country} />

      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
