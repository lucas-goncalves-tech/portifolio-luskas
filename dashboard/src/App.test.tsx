import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Test - Brutalist UI', () => {
  it('should render a Button with brutalist aesthetic classes (no rounded corners, specific colors)', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /brutalist button/i });
    
    expect(button).toBeInTheDocument();
    
    // Check for brutalist classes
    expect(button.className).toContain('rounded-none');
    expect(button.className).toContain('bg-red-900');
    expect(button.className).toContain('text-white');
  });
});
