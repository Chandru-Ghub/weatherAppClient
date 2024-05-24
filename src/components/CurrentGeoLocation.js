import React, { useEffect, useState } from 'react'

const CurrentGeoLocation = () => {
    const [position, setPosition] = useState({latitude: '',longitude: ''});

    useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        console.log("Geolocation is not available in your browser.");
      }
    }, []);  

  return {position}
}

export default CurrentGeoLocation