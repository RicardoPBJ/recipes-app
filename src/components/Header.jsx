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
        {
          !/^\/profile|\/done|\/favorite/i.test(pathname)
          && (
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
          )
        }
        <h1 data-testid="page-title">
          {[...pathname.matchAll(/(?<g1>\b[a-z])(?<g2>(?!\b[a-z])[a-z]+)/g)]
            .reduce((title, { groups: { g1, g2 } }) => (
              title ? `${title} ${g1.toUpperCase()}${g2}` : `${g1.toUpperCase()}${g2}`
            ), '')}
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
