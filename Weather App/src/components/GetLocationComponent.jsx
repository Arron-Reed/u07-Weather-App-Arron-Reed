import { useState } from "react";
import { useLocationStore } from "../store/useLocationStore";

export const GetLocation = () => {
    const [status, setStatus] = useState("");
    const [position, setPosition] = useLocationStore((state) => [
        state.position,
        state.setPosition,
    ]);
  
    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus("Geolocation is not supported on your browser!");
      } else {
        setStatus("Loading...");
      }
  
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setStatus("");
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude});
        },
        () => {
          setStatus("Unable to retrieve your position");
        }
      );
    };
  
  
    return (
      <div>
        <button onClick={() => getLocation()}>Get Location</button>
        {status && <p>Status: {status}</p>}
        {position && <p>Your latitude: {position.lat}</p>}
        {position && <p>Your longitude: {position.lng}</p>}
      </div>
    )
  }