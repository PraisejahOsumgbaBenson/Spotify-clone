import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constant";

export default function PlayerControls() {
  // Access token and player state from global state
  const [{ token, playerState }, dispatch] = useStateProvider();

  // Function to fetch player state from Spotify API
  const fetchPlayerState = useCallback(async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        // Dispatch updated player state
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: response.data.is_playing,
        });
      }
    } catch (error) {
      console.error(
        "Error fetching player state:",
        error.response ? error.response.data : error.message
      );
    }
  }, [token, dispatch]);

  useEffect(() => {
    // Fetch player state when component mounts
    fetchPlayerState();
    // Poll for player state every 3 seconds
    const intervalId = setInterval(fetchPlayerState, 3000);
    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [fetchPlayerState]);

  // Function to preload images for better performance
  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };

  // Function to change track (next or previous)
  const changeTrack = async (type) => {
    try {
      // Perform track change
      await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Fetch updated currently playing track
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data !== "") {
        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        preloadImage(currentlyPlaying.image);
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
      }
    } catch (error) {
      console.error(
        "Error changing track:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Function to toggle play/pause state
  const changeState = async () => {
    const newPlayerState = !playerState ? "play" : "pause";
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/${newPlayerState}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: !playerState,
      });
    } catch (error) {
      console.error(
        "Error changing player state:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Container>
      {/* Shuffle button */}
      <div className="shuffle">
        <BsShuffle />
      </div>
      {/* Previous track button */}
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
      </div>
      {/* Play/Pause button */}
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      {/* Next track button */}
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack("next")} />
      </div>
      {/* Repeat button */}
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

// Styled-component for the PlayerControls container
const Container = styled.div`
  display: flex; // Use flexbox for layout
  align-items: center; // Center items vertically
  justify-content: center; // Center items horizontally
  gap: 2rem; // Space between controls

  svg {
    color: #b3b3b3; // Default color for icons
    transition: 0.2s ease-in-out; // Smooth color transition on hover

    &:hover {
      color: white; // Change color on hover
    }
  }

  .state {
    svg {
      color: white; // Color for play/pause icon
    }
  }

  .previous,
  .next,
  .state {
    font-size: 2rem; // Font size for control icons
  }
`;
