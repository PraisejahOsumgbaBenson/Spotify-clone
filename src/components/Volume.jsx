import React, { useState } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";

// Volume component for controlling Spotify's volume
export default function Volume() {
  const [{ token }] = useStateProvider(); // Extracting token from global state
  const [volume, setVolume] = useState(50); // Initial volume set to 50%

  // Handle volume change and update both state and Spotify API
  const handleVolumeChange = async (e) => {
    const newVolume = parseInt(e.target.value); // Get new volume from slider
    setVolume(newVolume); // Update local state

    // Send volume change request to Spotify API
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: newVolume, // Set volume percentage
        },
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <Container>
      <input
        type="range"
        min={0} // Minimum value of the slider
        max={100} // Maximum value of the slider
        value={volume} // Current value of the slider
        onChange={handleVolumeChange} // Event handler for volume change
        style={{
          background: `linear-gradient(to right, white ${volume}%, gray ${volume}%)`, // Gradient background based on volume
        }}
      />
    </Container>
  );
}

// Styled component for Volume control
const Container = styled.div`
  display: flex;
  justify-content: flex-end; // Align to the end
  align-items: center; // Center align vertically

  input[type="range"] {
    width: 10rem; // Width of the slider
    height: 0.5rem; // Height of the slider
    -webkit-appearance: none; /* Remove default styling in WebKit browsers */
    cursor: pointer; // Pointer cursor on hover
    border-radius: 0; /* Square shape */
    background: gray; /* Default background color */
    position: relative;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 0.5rem; // Height of the track
    border-radius: 0; /* Square shape */
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; /* Hide default thumb */
    width: 0; /* Hide thumb */
    height: 0; /* Hide thumb */
  }
`;
