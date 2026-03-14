import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: 'Geolocation is not supported by your browser', loading: false }));
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      let message = 'An unknown error occurred';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = 'Location permission denied by user';
          break;
        case error.POSITION_UNAVAILABLE:
          message = 'Location information is unavailable';
          break;
        case error.TIMEOUT:
          message = 'The request to get user location timed out';
          break;
      }
      setState(s => ({ ...s, error: message, loading: false }));
    };

    // Use watchPosition for more reliability
    const watcher = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 15000, // Increased timeout to 15s
      maximumAge: 0
    });

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return state;
};
