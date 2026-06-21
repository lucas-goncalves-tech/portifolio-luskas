import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';
import { useAuthStore } from '../stores/authStore';

let mockIsAuthenticated = false;

vi.mock('../stores/authStore', () => ({
  useAuthStore: vi.fn((selector) => {
    return selector({
      isAuthenticated: mockIsAuthenticated,
    });
  }),
}));

vi.mock('react-router-dom', () => ({
  Navigate: ({ to }: any) => <div>Redirected to {to}</div>,
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    mockIsAuthenticated = false;
  });

  it('redirects to /login when not authenticated', () => {
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Redirected to /login')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    mockIsAuthenticated = true;

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Redirected to /login')).not.toBeInTheDocument();
  });
});
