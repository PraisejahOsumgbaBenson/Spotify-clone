import React from "react";
import styled from "styled-components";
import spotifyLogo from "../assets/Spotify-logo-white.png"; // Importing Spotify logo
import { IoLibrary } from "react-icons/io5"; // Importing library icon
import { MdHomeFilled, MdSearch } from "react-icons/md"; // Importing home and search icons
import Playlists from "./Playlist"; // Importing Playlists component

// Sidebar component displaying Spotify logo, navigation links, and playlists
export default function Sidebar() {
  return (
    <Container>
      <div className="top__links">
        {/* Sidebar logo */}
        <div className="logo">
          <img src={spotifyLogo} alt="Spotify Logo" />
        </div>
        <ul>
          {/* Navigation links */}
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlists /> {/* Rendering Playlists component */}
    </Container>
  );
}

// Styled component for Sidebar container
const Container = styled.div`
  background-color: black; // Background color for Sidebar
  color: #b3b3b3; // Text color
  display: flex;
  flex-direction: column;
  height: 100%; // Full height
  width: 100%; // Full width

  .top__links {
    display: flex;
    flex-direction: column;

    .logo {
      text-align: center;
      margin: 1rem 0;

      img {
        max-inline-size: 40%; // Adjusting logo size
        block-size: auto; // Ensuring logo scales appropriately
      }
    }

    ul {
      list-style-type: none; // Removing default list styles
      display: flex;
      flex-direction: column;
      gap: 1rem; // Gap between list items
      padding: 1rem;

      li {
        display: flex;
        gap: 1rem; // Gap between icon and text
        cursor: pointer; // Changing cursor to pointer on hover
        transition: 0.3s ease-in-out; // Adding smooth transition effect

        &:hover {
          color: white; // Changing text color on hover
        }
      }
    }
  }
`;
