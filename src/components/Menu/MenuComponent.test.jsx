import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MenuComponent } from './MenuComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TestWrapper from '../../../__tests__/utils/testWrapper';

describe('MenuComponent', () => {
  it('should open the popover when hovering the email button', async () => {
    render(
      <TestWrapper>
        <QueryClientProvider client={new QueryClient()}>
          <MenuComponent />
        </QueryClientProvider>
      </TestWrapper>,
    );

    const emailButton = screen.getByRole('button', { describedby: 'email-button' });

    fireEvent.mouseEnter(emailButton);

    const popoverContent = await screen.findByText('Sair');
    expect(popoverContent).toBeInTheDocument();
  });

  it('should logout when clicking the logout button', async () => {
    render(
      <TestWrapper>
        <QueryClientProvider client={new QueryClient()}>
          <MenuComponent />
        </QueryClientProvider>
      </TestWrapper>,
    );

    const emailButton = screen.getByRole('button', { describedby: 'email-button' });
    fireEvent.mouseEnter(emailButton);

    const logoutButton = await screen.findByText('Sair');
    fireEvent.click(logoutButton);
  });
});
