import React from 'react';
import { render, screen } from '@testing-library/react';
import { it, describe, expect, vi, beforeEach } from 'vitest';
import { AuthProvider } from './AuthProvider';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('react-router', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

describe('AuthProvider', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('should navigate to /home if authenticated and on the root path', () => {
    useSelector.mockReturnValue({ token: 'valid-token' });
    useLocation.mockReturnValue({ pathname: '/' });

    render(
      <AuthProvider>
        <div>Test Content</div>
      </AuthProvider>,
    );

    expect(mockNavigate).toHaveBeenCalledWith('/home', { replace: true });
  });

  it('should navigate to / if not authenticated and not on the root path', () => {
    useSelector.mockReturnValue({ token: null });
    useLocation.mockReturnValue({ pathname: '/dashboard' });

    render(
      <AuthProvider>
        <div>Test Content</div>
      </AuthProvider>,
    );

    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('should render children if authenticated and not on the root path', () => {
    useSelector.mockReturnValue({ token: 'valid-token' });
    useLocation.mockReturnValue({ pathname: '/dashboard' });

    render(
      <AuthProvider>
        <div>Test Content</div>
      </AuthProvider>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render children if not authenticated and on the root path', () => {
    useSelector.mockReturnValue({ token: null });
    useLocation.mockReturnValue({ pathname: '/' });

    render(
      <AuthProvider>
        <div>Test Content</div>
      </AuthProvider>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
