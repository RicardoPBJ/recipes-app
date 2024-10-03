import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { AiOutlineUser } from 'react-icons/ai';
import SearchBar from './SearchBar';
import '../styles/App.css';

export default function Header() {
  const [search, setSearch] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="container">
      <header className="headerfix align-items-center justify-content-evenly">
        {
          !/^\/profile|\/done|\/favorite/i.test(pathname)
          && (
            <button
              style={ { background: 'none', border: 'none' } }
              onClick={ () => setSearch(!search) }
            >
              <IoSearch
                className="iconSrch"
                size={ 40 }
                alt="profile-icon"
                data-testid="search-top-btn"
              />
            </button>
          )
        }
        <h1 data-testid="page-title" className="text-white">
          {[...pathname.matchAll(/(?<g1>\b[a-z])(?<g2>(?!\b[a-z])[a-z]+)/g)]
            .reduce((title, { groups: { g1, g2 } }) => (
              title ? `${title} ${g1.toUpperCase()}${g2}` : `${g1.toUpperCase()}${g2}`
            ), '')}
        </h1>
        <Link to="/profile">
          <AiOutlineUser
            alt="profile-icon"
            data-testid="profile-top-btn"
            size={ 40 }
            color="white"
          />
        </Link>
      </header>
      {
        search && <SearchBar />
      }
    </div>
  );
}
