/* eslint-disable react/prop-types */
import CityItem from './cityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message='there are no cities yet ' />
    );

  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          key={city.id}
          city={city}
        />
      ))}
    </div>
  );
}

export default CityList;
