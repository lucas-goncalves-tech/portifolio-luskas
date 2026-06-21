import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { useAuthStore } from '../stores/authStore';
import { api } from '../lib/axios';

const mockNavigate = vi.fn();
const mockLogin = vi.fn();
let mockToken: string | null = null;
let mockIsAuthenticated = false;

vi.mock('../stores/authStore', () => ({
  useAuthStore: vi.fn((selector) => {
    return selector({
      token: mockToken,
      isAuthenticated: mockIsAuthenticated,
      login: mockLogin,
      logout: () => {
        mockToken = null;
        mockIsAuthenticated = false;
      }
    });
  }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  MemoryRouter: ({ children }: any) => <div>{children}</div>,
  BrowserRouter: ({ children }: any) => <div>{children}</div>,
}));

// Mock axios
vi.mock('../lib/axios', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockToken = null;
    mockIsAuthenticated = false;
  });

  const renderLogin = () => {
    return render(
      <Login />
    );
  };

  it('renders login form with brutalist aesthetic elements', () => {
    renderLogin();
    
    // Check for core elements
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('submits form and saves token on success', async () => {
    const mockToken = 'fake-jwt-token-123';
    vi.mocked(api.post).mockResolvedValueOnce({ data: { token: mockToken } });

    renderLogin();

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'admin@example.com',
        password: 'password123',
      });
    });

    expect(mockLogin).toHaveBeenCalledWith(mockToken);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('displays error on failed login', async () => {
    vi.mocked(api.post).mockRejectedValueOnce(new Error('Credenciais inválidas'));

    renderLogin();

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao fazer login/i)).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });
});
