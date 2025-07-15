import { useEffect, useState } from "react";
import {
  MapContainer,
  useMapEvents,
  TileLayer,
  Marker,
  useMap,
  Popup,
} from "react-leaflet";

import { useCitiesContext } from "../context/citiesContext";

import Button from "./Button";

import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeolocation";
import useUrlPosition from "../hooks/useUrlPosition";
import useGoToForm from "../hooks/useGoToForm";

function ChangeView({ position, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, zoom);
  }, [position, zoom, map]);

  return null;
}

function DetectClick() {
  const goToForm = useGoToForm();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;

      goToForm({ lat, lng });
    },
  });

  return null;
}

function Map() {
  const goToForm = useGoToForm();

  const { cities } = useCitiesContext();
  const {
    isLoading,
    position: GeolocationPosition,
    getPosition: getGeolocationPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();

  const [zoom, setZoom] = useState(3);
  const [position, setPosition] = useState([40, 40]);

  useEffect(() => {
    if (lat && lng) {
      setPosition([+lat, +lng]);
      setZoom(6);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (GeolocationPosition.lat && GeolocationPosition.lng) {
      goToForm({
        lat: GeolocationPosition.lat,
        lng: GeolocationPosition.lng,
      });
    }
  }, [GeolocationPosition, goToForm]);

  return (
    <div className={styles.mapContainer}>
      {!GeolocationPosition.lat && !GeolocationPosition.lng && (
        <Button type="position" onClick={getGeolocationPosition}>
          {isLoading ? "Loading..." : "Get your position"}
        </Button>
      )}

      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <ChangeView position={position} zoom={zoom} />

        <DetectClick />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <h4>
                city : {city.cityName}
                <br />
                country : {city.country}
              </h4>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
