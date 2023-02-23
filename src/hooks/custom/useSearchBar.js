import { useState } from 'react';

export default function useSearchBar() {
  const [dataSearch, setDataSearch] = useState({ radioOpt: '', searchBar: '' });

  function handleSearch({ target: { name, value } }) {
    setDataSearch({
      ...dataSearch,
      [name]: value,
    });
  }
  return {
    dataSearch,
    handleSearch,
  };
}
