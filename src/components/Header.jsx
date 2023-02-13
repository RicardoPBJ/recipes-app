import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/App.css';

export default function Header() {
  const [search, setSearch] = useState(false);
  const { pathname } = useLocation();

  return (
    <main className="headerfix">
      <header className="headerfix">
        <button
          style={ { background: 'none', border: 'none', marginLeft: '90px' } }
          onClick={ () => setSearch(!search) }
        >
          <img
            src={ searchIcon }
            alt="profile-icon"
            data-testid="search-top-btn"
          />
        </button>
        <h1 data-testid="page-title">
          {pathname.replace(
            /(.+)(\b\w)((?!\b\w)\w+)/,
            (_all, _p1, p2, p3) => `${p2.toUpperCase()}${p3}`,
          )}
        </h1>
        <Link to="/profile">
          <img
            alt="profile-icon"
            data-testid="profile-top-btn"
            src={ profileIcon }
          />
        </Link>
      </header>
      {
        search && <SearchBar />
      }
    </main>
  );
}
