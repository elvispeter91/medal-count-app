import { render, screen } from '@testing-library/react';
import AppHeader from '@/lib/components/blocks/appHeader/appHeader';

describe('AppHeader', () => {
  test('renders heading with correct text', () => {
    render(<AppHeader />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Medal Count');
  });

  test('has correct Tailwind classes', () => {
    render(<AppHeader />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass(
      'text-left',
      'font-thin',
      'tracking-tight',
      'pb-5',
      'text-5xl'
    );
  });
});