// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCities } from "../../contexts/CitiesContext";
import { formatDate, getLocationData } from "../../helpers/Helpers";

import { useUrlPosition } from "../../hooks/useUrlPosition";

import Button from "../Button/Button";
import BackButton from "../BackButton/BackButton";

import styles from "./Form.module.css";
import Spinner from "../spinner/spinner";
import Message from "../Message/Message";

function Form() {
  const navigate = useNavigate();

  const { addCity, isLoading } = useCities();
  const [lat, lng] = useUrlPosition();

  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(true);
  const [geoCodingErorr, setGeoCodingErorr] = useState("");

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  async function handleSubmitForm(e) {
    e.preventDefault();

    if (!cityName || !country || !emoji || !date || !lat || !lng)
      return;

    const data = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await addCity(data);

    navigate("/app/cities");
  }

  useEffect(
    function () {
      async function callback() {
        try {
          if (!lat || !lng) return;

          setIsLoadingGeoCoding(true);
          setGeoCodingErorr("");

          const data = await getLocationData(lat, lng);

          if (!data.cityName)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            );

          setCityName(data.cityName);
          setCountry(data.country);
          setEmoji(data.emoji);
        } catch (error) {
          setGeoCodingErorr(error.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      callback();
    },
    [lat, lng]
  );

  if (isLoadingGeoCoding) return <Spinner />;

  if (!lat || !lng)
    return (
      <Message message={"Start by clicking somewhere on the map "} />
    );

  if (geoCodingErorr) return <Message message={geoCodingErorr} />;

  return (
    <form
      className={`${styles.form} ${
        isLoading ? styles.loading : null
      }`}
      onSubmit={handleSubmitForm}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <img className={styles.flag} src={emoji} alt={country} />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={formatDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to {cityName}
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
