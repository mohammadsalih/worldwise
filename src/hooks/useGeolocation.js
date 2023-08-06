import { useState } from "react";

export function useGeolocation(setMapPosition) {
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function getPosition() {
    if (!navigator.geolocation) return;

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setMapPosition([pos.coords.latitude, pos.coords.longitude]);
        setIsLoading(false);
      },
      (error) => {
        console.error(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, getPosition, position };
}
