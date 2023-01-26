import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button, Input } from '../components';

describe('testes do componente button.', () => {
  test('Verifica se o Button renderiza sem label', () => {
    render(<Button nameButton="entrar" />);

    expect(screen.queryByLabelText('entrar')).not.toBeInTheDocument();
  });

  test('Verifica se o Button renderiza com a label.', () => {
    render(<Button nameButton="entrar" labelName="clica" type="submit" eventClick={ () => {} } />);

    expect(screen.getByLabelText('clica')).toBeInTheDocument();
    expect(screen.getByLabelText('clica')).toHaveAttribute('type', 'submit');
  });

  test('Verifica se o Input renderiza sem label.', () => {
    render(<Input name="input-value" />);

    expect(screen.queryByLabelText('input-value')).not.toBeInTheDocument();
  });
});
