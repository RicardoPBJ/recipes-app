/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import Meals from './Meals';
import Drinks from './Drinks';
import { Footer } from '../components';

function Recipes({ history: { location: { pathname } } }) {
  return (
    <main>
      {
        pathname === '/meals'
          ? (
            <div>
              <Meals />
              <Footer />
            </div>
          )
          : (
            <div>
              <Drinks />
              <Footer />
            </div>
          )
      }
    </main>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.objectOf(PropTypes.string),
    pathname: PropTypes.string,
  }).isRequired,

};

export default Recipes;
