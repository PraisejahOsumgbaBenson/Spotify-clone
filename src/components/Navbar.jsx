import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../utils/StateProvider";

// Navbar component for the Spotify application
// Allows dynamic background color change via the navBackground prop
export default function Navbar({ navBackground }) {
  // Access userInfo from the global state using the state provider
  const [{ userInfo }] = useStateProvider();

  return (
    <Container navBackground={navBackground}>
      {/* Search bar section with a search icon and input field */}
      <div className="search__bar">
        <FaSearch />
        <input type="text" placeholder="Artists, songs, or podcasts" />
      </div>

      {/* User avatar and profile section */}
      <div className="avatar">
        {/* Button to display user profile icon and name */}
        <button>
          <CgProfile />
          <span>{userInfo?.userName}</span>
        </button>
      </div>
    </Container>
  );
}

// Styled-component for the Navbar container
const Container = styled.div`
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 2rem; 
  height: 15vh; 
  position: sticky; 
  top: 0; 
  transition: 0.3s ease-in-out; 

  // Apply dynamic background color based on the navBackground prop
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};

  // Styling for the search bar
  .search__bar {
    background-color: white; 
    width: 30%; 
    padding: 0.4rem 1rem; 
    border-radius: 2rem; 
    display: flex; 
    align-items: center; 
    gap: 0.5rem;

    // Styling for the search input field
    input {
      border: none; 
      height: 2rem;
      width: 100%; 

      &:focus {
        outline: none; 
      }
    }
  }

  // Styling for the user avatar section
  .avatar {
    background-color: black; 
    padding: 0.3rem 0.4rem; 
    padding-right: 1rem;
    border-radius: 2rem; 
    display: flex; 
    justify-content: center; 
    align-items: center; 

    // Styling for the button that contains the profile icon and user name
    button {
      display: flex; 
      justify-content: center; 
      align-items: center;
      gap: 0.5rem; 
      text-decoration: none; 
      color: white; 
      font-weight: bold; 
      background: none; 
      border: none; 
      cursor: pointer;

      // Styling for the profile icon within the button
      svg {
        font-size: 1.3rem; 
        background-color: #282828; 
        padding: 0.2rem; 
        border-radius: 1rem; 
        color: #c7c5c5;
      }
    }
  }
`;
