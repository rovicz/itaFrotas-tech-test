import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MenuComponent } from './MenuComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Cookies from 'js-cookie';

vi.mock('js-cookie', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    get: vi.fn(),
  };
});

describe('MenuComponent', () => {
  it('should open the popover when hovering the email button', async () => {
    vi.mocked(Cookies.get).mockReturnValue('teste@teste.com');

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MenuComponent />
      </QueryClientProvider>,
    );

    const emailButton = screen.getByRole('button', { describedby: 'email-button' });

    fireEvent.mouseEnter(emailButton);

    const popoverContent = await screen.findByText('Sair');
    expect(popoverContent).toBeInTheDocument();
  });
});
