import styles from "./CountryItem.module.css";

function CountryItem({ countryData }) {
  const { emoji, country } = countryData;

  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
