// import PropTypes from 'prop-types';
// import { createContext, useMemo, useState } from 'react';

// const RecipeContext = createContext();

// function RecipeProvider({ children }) {
//   const [input, setInput] = useState({
//     email: '',
//     password: '',
//   });

//   const values = useMemo(() => ({
//     input,
//   }), [input]);
//   return (
//     <RecipeContext.Provider value={ values }>
//       { children }
//     </RecipeContext.Provider>
//   );
// }

// RecipeProvider.propTypes = {
//   children: PropTypes.isRequired,
// };

// export default RecipeProvider;
