/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useParams } from 'react-router-dom';
import styles from './City.module.css';
import Spinner from './Spinner';
import { useCitiesContext } from '../context/citiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function City() {
  const { cities } = useCitiesContext();
  const { id } = useParams();

  const currentCity = cities
    ?.filter((city) =>
      Number(city.id) === Number(id) ? city : '',
    )
    ?.at(0);

  if (!currentCity) return <Spinner />;

  const { cityName, emoji, date, notes } =
    currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>{/* <ButtonBack /> */}</div>
    </div>
  );
}

export default City;
