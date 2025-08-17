import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders file table with default data', () => {
    render(<App />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Device')).toBeInTheDocument();
    expect(screen.getByText('Path')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    expect(screen.getByText('smss.exe')).toBeInTheDocument();
    expect(screen.getByText('netsh.exe')).toBeInTheDocument();
    expect(screen.getByText('uxtheme.dll')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /download.*selected/i })
    ).toBeInTheDocument();
  });

  test('renders app with basic structure', () => {
    render(<App />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const appContainer = document.querySelector('.app-container');
    expect(appContainer).toBeInTheDocument();
  });
});
