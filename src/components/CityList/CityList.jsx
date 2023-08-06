import CityItem from "../CItyItem/CityItem";
import Spinner from "../spinner/spinner";
import Message from "../Message/Message";

import styles from "./CityList.module.css";
import { useCities } from "../../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} cityData={city} />
      ))}
    </ul>
  );
}

export default CityList;
