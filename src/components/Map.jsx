// import {
//   useNavigate,
//   useSearchParams,
// } from 'react-router-dom';

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import styles from './Map.module.css';

function Map() {
  // const navigate = useNavigate();
  // const [searchParams, setSearchParams] =
  //   useSearchParams();

  // const lat = searchParams.get('lat');
  // const lng = searchParams.get('lng');

  const position = [51.505, -0.09];

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily
            customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
