import { Link } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";

import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ cityData }) {
  const { currentCity, deleteCity } = useCities();

  const {
    cityName,
    emoji,
    date,
    country,
    id,
    position: { lat, lng },
  } = cityData;

  function handleDeleteCity(e) {
    e.preventDefault();
    deleteCity(id);
    console.log("mazaar deleted");
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <img src={emoji} className={styles.emoji} alt={country} />

        <h3 className={styles.name}>{cityName}</h3>

        <time className={styles.date}>({formatDate(date)})</time>

        <button
          className={styles.deleteBtn}
          onClick={handleDeleteCity}
        >
          {" "}
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
