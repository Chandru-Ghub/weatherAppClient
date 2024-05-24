// export default currentLocation

 const currentLocation = () =>{
  let location = 'chan'
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      currentLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
  };
  });
  } else {
      console.log("Geolocation is not available in your browser.");
  }

  return 'location'
}