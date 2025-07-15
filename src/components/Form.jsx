/* eslint-disable no-unused-vars */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

import useUrlPosition from "../hooks/useUrlPosition";

import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCitiesContext } from "../context/citiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();

  const { createCity, isLoading: postLoading } = useCitiesContext();

  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      async function fetchCityData() {
        if (!lat || !lng) {
          setError("No coordinates provided.");
          setIsLoading(false);
          return;
        }

        try {
          setIsLoading(true);
          setError(false);

          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );

          const data = await response.json();

          setCityName(data.city || data.locality || data.principalSubdivision);
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          console.error("Error fetching city data:", error);

          setError(`There was an error :  ${error}`);
        } finally {
          setIsLoading(false);
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  const handleSubmit = async function (e) {
    e.preventDefault();

    if (!cityName || !date) return setError("Please fill in all fields.");

    const newCity = {
      cityName,
      country,
      date: date.toISOString(),
      notes,
      emoji,
      position: {
        lat: +lat,
        lng: +lng,
      },
    };

    await createCity(newCity);
    navigate("/app/cities");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Message message={error} />;
  }

  return (
    <form
      className={`${styles.form} ${postLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/YYYY"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="submit">Add</Button>

        <Button
          type={"back"}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
