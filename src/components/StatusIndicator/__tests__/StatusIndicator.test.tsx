import { render, screen } from '@testing-library/react';
import { StatusIndicator } from '../StatusIndicator';

describe('StatusIndicator Component', () => {
  test('renders status label correctly', () => {
    render(<StatusIndicator label="Available" />);

    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  test('renders with color indicator when color is provided', () => {
    render(<StatusIndicator label="Available" color="green" />);

    // Check that the status dot is rendered
    const statusDot = document.querySelector('.status-dot');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveStyle('background-color: rgb(0, 128, 0)');
  });

  test('renders without color indicator when no color is provided', () => {
    render(<StatusIndicator label="Scheduled" />);

    // Check that no status dot is rendered
    const statusDot = document.querySelector('.status-dot');
    expect(statusDot).not.toBeInTheDocument();

    // Check that only the label is rendered
    expect(screen.getByText('Scheduled')).toBeInTheDocument();
  });
});
