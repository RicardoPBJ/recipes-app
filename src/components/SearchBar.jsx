import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MealsContext, DrinksContext } from '../hooks';
import Input from './Input';

export default function SearchBar() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [radioChanges, setRadioChanges] = useState({
    radioOptions: '',
    searchBar: '',
  });
  const context = pathname === '/meals' ? MealsContext : DrinksContext;
  const { makeFetchRecipes, recipesData } = useContext(context);
  useEffect(() => {
    if (recipesData.length === 1) {
      const isId = pathname === '/meals' ? recipesData[0].idMeal : recipesData[0].idDrink;
      history.push(`${pathname}/${isId}`);
    }
  }, [recipesData, history, pathname]);
  const isMeal = async (radio, search) => {
    switch (radio) {
    case 'ingredient':
      await makeFetchRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
      break;
    case 'name':
      await makeFetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      break;
    case 'firstLetter':
      if (search.length === 1) {
        await makeFetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default: {
      return null;
    }
    }
  };
  const isDrink = async (radio, search) => {
    switch (radio) {
    case 'ingredient':
      await makeFetchRecipes(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
      break;
    case 'name':
      await makeFetchRecipes(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
      break;
    case 'firstLetter':
      if (search.length === 1) {
        await makeFetchRecipes(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`,
        );
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default: {
      return null;
    }
    }
  };
  const onClick = () => {
    const { radioOptions, searchBar } = radioChanges;
    if (pathname === '/meals') {
      isMeal(radioOptions, searchBar);
    }
    if (pathname === '/drinks') {
      isDrink(radioOptions, searchBar);
    }
  };
  const radioChange = ({ target: { name, value } }) => {
    setRadioChanges({
      ...radioChanges,
      [name]: value,
    });
  };
  return (
    <div>
      <Input
        name="searchBar"
        placeholder="Search"
        type="text"
        testId="search-input"
        labelName="Search"
        eventChange={ radioChange }
      />
      <Input
        name="radioOptions"
        type="radio"
        testId="ingredient-search-radio"
        labelName="Ingredient"
        eventChange={ radioChange }
        value="ingredient"
      />
      <Input
        name="radioOptions"
        type="radio"
        testId="name-search-radio"
        labelName="Name"
        eventChange={ radioChange }
        value="name"
      />
      <Input
        name="radioOptions"
        type="radio"
        testId="first-letter-search-radio"
        labelName="First letter"
        eventChange={ radioChange }
        value="firstLetter"
      />
      <Button
        type="button"
        data-tesid="exec-search-btn"
        onClick={ onClick }
      >
        Search
      </Button>
    </div>
  );
}
