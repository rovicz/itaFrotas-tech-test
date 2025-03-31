import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Home } from '.';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TestWrapper from '../../../__tests__/utils/testWrapper';

describe('Home Page', () => {
  vi.mock('js-cookie', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      get: vi.fn(),
    };
  });

  it('should have a title called Usuários', async () => {
    render(
      <TestWrapper>
        <QueryClientProvider client={new QueryClient()}>
          <Home />
        </QueryClientProvider>
      </TestWrapper>,
    );

    const title = await screen.findByText('Usuários');

    expect(title).toBeInTheDocument();
  });

  it('should have a table', async () => {
    render(
      <TestWrapper>
        <QueryClientProvider client={new QueryClient()}>
          <Home />
        </QueryClientProvider>
      </TestWrapper>,
    );

    const table = await screen.findByRole('table');

    expect(table).toBeInTheDocument();
  });
});
