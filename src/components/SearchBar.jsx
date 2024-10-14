import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MealsContext, DrinksContext } from '../hooks';
import Input from './Input';
import './css/SearchBar.css';

export default function SearchBar() {
  const { pathname } = useLocation();
  const { makeFetchSearchRecipes, handleSearch, dataSearch } = useContext(
    pathname.includes('meals') ? MealsContext : DrinksContext,
  );

  return (
    <div className="search-bar align-items-center justify-content-between">
      <div className="container search-radio-container">
        <Input
          labelStyle="label-search container"
          inputStyle="search-input container"
          name="searchBar"
          placeholder="Search"
          type="text"
          testId="search-input"
          labelName=""
          eventChange={ handleSearch }
        />
        <div className="container d-flex">
          <Input
            labelStyle="radio-label"
            inputStyle="radio-input radio-anime"
            name="group"
            type="radio"
            testId="ingredient-search-radio"
            labelName="Ingredient"
            eventChange={ handleSearch }
            value="ingredient"
          />
          <Input
            labelStyle="radio-label"
            inputStyle="radio-input radio-anime"
            name="radioOpt"
            type="radio"
            testId="name-search-radio"
            labelName="Name"
            eventChange={ handleSearch }
            value="name"
          />
          <Input
            labelStyle="radio-label"
            inputStyle="radio-input radio-anime"
            name="radioOpt"
            type="radio"
            testId="first-letter-search-radio"
            labelName="First letter"
            eventChange={ handleSearch }
            value="firstLetter"
          />
        </div>
      </div>
      <Button
        className="radio-button"
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => makeFetchSearchRecipes(dataSearch) }
      >
        Search
      </Button>
    </div>
  );
}
