/* eslint-disable react/prop-types */
import { useCitiesContext } from '../context/citiesContext';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CountryList() {
  const { countries, isLoading } =
    useCitiesContext();

  if (isLoading) return <Spinner />;

  if (!countries.length)
    return (
      <Message message='there are no countries  yet ' />
    );

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem
          key={country.id}
          country={country}
        />
      ))}
    </div>
  );
}

export default CountryList;
