import { useState, useEffect } from "react";
import { useLocationStore } from "../../store/useLocationStore";

export const GetLocation = () => {
  const [status, setStatus] = useState("");
  const [position, setPosition] = useState("")

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported on your browser!");
    } else {
      setStatus("Loading...");
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStatus("");
        console.log(pos)
        setPosition(pos.coords.latitude + "," + pos.coords.longitude);
        console.log(position)
      },
      () => {
        setStatus("Unable to retrieve your position");
      }
    );

    console.log(status);
    console.log(position);
  };

  return (
    <div>
      <button onClick={() => getLocation()}>Get Location</button>
      {status && <p>Status: {status}</p>}
      {position && <p>Your latitude: {position.lat}</p>}
      {position && <p>Your longitude: {position.lng}</p>}
    </div>
  );
};
