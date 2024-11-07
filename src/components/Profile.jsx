import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import './css/Profile.css';

function Profile() {
  const { storedValue, handleLogout } = useLocalStorage('user', 'email');
  const { push } = useHistory();

  return (
    <main className="container bg-main">
      <div className="main-container">
        USER
        <div>
          <p data-testid="profile-email">{storedValue.email}</p>
        </div>
        <div className="container btns-container">
          <div>
            <button
              className="user-button"
              onClick={ () => push('/done-recipes') }
              data-testid="profile-done-btn"
              type="button"
            >
              Done Recipes
            </button>
          </div>
          <div>
            <button
              className="user-button"
              onClick={ () => push('/favorite-recipes') }
              data-testid="profile-favorite-btn"
              type="button"
            >
              Favorite Recipes
            </button>
          </div>
          <div className="container align-itens-center">
            <button
              onClick={ handleLogout }
              data-testid="profile-logout-btn"
              type="button"
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
