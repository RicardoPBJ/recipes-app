import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DrinksProvider from './hooks/context/DrinksProvider';
import MealsProvider from './hooks/context/MealsProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DrinksProvider>
      <MealsProvider>
        <App />
      </MealsProvider>
    </DrinksProvider>
  </BrowserRouter>,
);
