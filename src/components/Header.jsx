import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import MenuSheet from './MenuSheet';
import SearchBar from './SearchBar';
import '../styles/App.css';

export default function Header() {
  const [search, setSearch] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="container">
      <header className="headerfix align-items-center justify-content-between">
        <h1 data-testid="page-title" className="header-title">
          {[...pathname.matchAll(/(?<g1>\b[a-z])(?<g2>(?!\b[a-z])[a-z]+)/g)]
            .reduce((title, { groups: { g1, g2 } }) => (
              title ? `${title} ${g1.toUpperCase()}${g2}` : `${g1.toUpperCase()}${g2}`
            ), '')}
        </h1>
        {
          search && <SearchBar />
        }
        <div className="d-flex">
          {
            !/^\/profile|\/done|\/favorite/i.test(pathname)
          && (
            <button
              style={ { background: 'none', border: 'none', marginRight: '2em' } }
              onClick={ () => setSearch(!search) }
            >
              <IoSearch
                className="icons container"
                size={ 43 }
                alt="search-icon"
                data-testid="search-top-btn"
              />
            </button>
          )
          }
          <MenuSheet />
        </div>
      </header>
    </div>
  );
}
