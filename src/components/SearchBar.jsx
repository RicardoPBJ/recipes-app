import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MealsContext, DrinksContext } from '../hooks';
import Input from './Input';

export default function SearchBar() {
  const { pathname } = useLocation();
  const { makeFetchSearchRecipes, handleSearch, dataSearch } = useContext(
    pathname.includes('meals') ? MealsContext : DrinksContext,
  );

  return (
    <div>
      <Input
        name="searchBar"
        placeholder="Search"
        type="text"
        testId="search-input"
        labelName="Search"
        eventChange={ handleSearch }
      />
      <Input
        name="radioOpt"
        type="radio"
        testId="ingredient-search-radio"
        labelName="Ingredient"
        eventChange={ handleSearch }
        value="ingredient"
      />
      <Input
        name="radioOpt"
        type="radio"
        testId="name-search-radio"
        labelName="Name"
        eventChange={ handleSearch }
        value="name"
      />
      <Input
        name="radioOpt"
        type="radio"
        testId="first-letter-search-radio"
        labelName="First letter"
        eventChange={ handleSearch }
        value="firstLetter"
      />
      <Button
        type="button"
        data-tesid="exec-search-btn"
        onClick={ () => makeFetchSearchRecipes(dataSearch) }
      >
        Search
      </Button>
    </div>
  );
}
