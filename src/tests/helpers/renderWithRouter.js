import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderWithRouter = (
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({ ...render(<Router history={ history }>{component}</Router>), history });

export default renderWithRouter;
