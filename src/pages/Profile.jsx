import React from 'react';
import { useHistory } from 'react-router-dom';
import { Footer, Button } from '../components';
import useLocalStorage from '../hooks/custom/useLocalStorage';

function Profile() {
  const { storedValue, clearStorage } = useLocalStorage('user', null);
  const history = useHistory();

  const pageRedirect = ({ target }) => {
    history.push(target.value);
  };

  const handleLogout = () => {
    clearStorage();
    history.push('/');
  };

  return (
    <main>
      <div>
        Profile
        <div>
          <p data-testid="profile-email">{storedValue.email}</p>
        </div>
        <div className="profile-btns-container">
          <div>
            <Button
              nameButton="Done Recipes"
              eventClick={ pageRedirect }
              testId="profile-done-btn"
              type="button"
              value="/done-recipes"
            />
          </div>
          <div>
            <Button
              nameButton="Favorite Recipes"
              eventClick={ pageRedirect }
              testId="profile-favorite-btn"
              type="button"
              value="/favorite-recipes"
            />
          </div>
          <div>
            <Button
              nameButton="Logout"
              eventClick={ handleLogout }
              testId="profile-logout-btn"
              type="button"
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;
