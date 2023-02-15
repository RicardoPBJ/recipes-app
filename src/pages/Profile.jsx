import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Footer, Header } from '../components';
import { useLocalStorage } from '../hooks';

function Profile() {
  const { storedValue, handleLogout } = useLocalStorage('user', 'email');
  const { push } = useHistory();

  return (
    <main>
      <Header searchAppear={ false } />
      <div>
        Profile
        <div>
          <p data-testid="profile-email">{storedValue.email}</p>
        </div>
        <div className="profile-btns-container">
          <div>
            <Button
              onClick={ () => push('/done-recipes') }
              data-testid="profile-done-btn"
              type="button"
            >
              Done Recipes
            </Button>
          </div>
          <div>
            <Button
              onClick={ () => push('/favorite-recipes') }
              data-testid="profile-favorite-btn"
              type="button"
            >
              Favorite Recipes
            </Button>
          </div>
          <div>
            <Button
              onClick={ handleLogout }
              data-testid="profile-logout-btn"
              type="button"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;
