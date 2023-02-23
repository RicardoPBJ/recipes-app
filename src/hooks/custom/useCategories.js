import { useState } from 'react';

export default function useCategories(makeFetchRecipes, makeFetchCatItems) {
  const [allRecipes, setAllRecipes] = useState(false);
  const [clrCatRecipes, setClearCat] = useState(false);
  const [historyCat, setHistoryCat] = useState('');

  function searchCategory({ target: { value } }) {
    setAllRecipes(true);

    if (historyCat === value) setClearCat(!clrCatRecipes);
    else {
      setClearCat(false);
      setHistoryCat(value);
      makeFetchCatItems(value);
    }

    if (clrCatRecipes) makeFetchRecipes();
  }

  function showAllcat() {
    setAllRecipes(false);
    setClearCat(false);
    setHistoryCat('');
  }

  return {
    allRecipes,
    clrCatRecipes,
    searchCategory,
    showAllcat,
  };
}
