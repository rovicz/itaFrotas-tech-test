import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Home } from '.';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Cookies from 'js-cookie';

const navigateMock = vi.fn();

describe('Home Page', () => {
  vi.mock('react-router', () => ({
    useNavigate() {
      return navigateMock;
    },
  }));

  vi.mock('js-cookie', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      get: vi.fn(),
    };
  });

  it('should have a title called Usuários', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Home />
      </QueryClientProvider>,
    );

    const title = await screen.findByText('Usuários');

    expect(title).toBeInTheDocument();
  });

  it('should have a table', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Home />
      </QueryClientProvider>,
    );

    const table = await screen.findByRole('table');

    expect(table).toBeInTheDocument();
  });

  it('should return to login page if user dont have a active token', async () => {
    vi.mocked(Cookies.get).mockReturnValue(undefined);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Home />
      </QueryClientProvider>,
    );

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
