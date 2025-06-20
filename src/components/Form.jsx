/* eslint-disable no-unused-vars */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./Form.module.css";

import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import useUrlPosition from "../hooks/useUrlPosition";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();

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
          console.log(data);
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

  const handleSubmit = function (e) {
    e.preventDefault();

    console.log("hey");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Message message={error} />;
  }

  return (
    <form className={styles.form}>
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
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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
        <Button type="submit" onClick={handleSubmit}>
          Add
        </Button>

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
