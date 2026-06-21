import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Reports from './Reports';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as ReactQuery from '@tanstack/react-query';

// Mock the react-query hooks
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
  })),
}));

describe('Reports Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a grid of reports fetched from the backend', () => {
    const mockReports = [
      { id: 1, title: 'Report 1', content: 'Content 1' },
      { id: 2, title: 'Report 2', content: 'Content 2' },
    ];

    vi.mocked(ReactQuery.useQuery).mockReturnValue({
      data: mockReports,
      isLoading: false,
    } as any);

    vi.mocked(ReactQuery.useMutation).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);

    render(<Reports />);

    expect(screen.getByText('Report 1')).toBeInTheDocument();
    expect(screen.getByText('Report 2')).toBeInTheDocument();
  });

  it('renders a technical form to create or edit a report', () => {
    vi.mocked(ReactQuery.useQuery).mockReturnValue({
      data: [],
      isLoading: false,
    } as any);

    vi.mocked(ReactQuery.useMutation).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);

    render(<Reports />);

    expect(screen.getByPlaceholderText(/título/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/markdown/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
  });
});

