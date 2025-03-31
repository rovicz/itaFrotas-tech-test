import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { it, expect, describe, vi, beforeEach } from 'vitest';
import { Auth } from '.';
import TestWrapper from '../../../__tests__/utils/testWrapper';
import axios from 'axios';
import { store } from '../../store/store';

vi.mock('axios');

describe('Auth Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the email, password fields, and the submit button', () => {
    render(
      <TestWrapper>
        <Auth />
      </TestWrapper>,
    );

    expect(screen.getByTestId('emailInput')).toBeInTheDocument();
    expect(screen.getByTestId('passwordInput')).toBeInTheDocument();
    expect(screen.getByTestId('submitButton')).toBeInTheDocument();
  });

  it('should successfully submit the form and process the API response', async () => {
    // Mock axios to simulate a successful response
    const mockSuccessResponse = { token: 'QpwL5tke4Pnpja7X4' };
    axios.post.mockResolvedValue({ data: mockSuccessResponse });

    render(
      <TestWrapper>
        <Auth />
      </TestWrapper>,
    );

    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const submitButton = screen.getByTestId('submitButton');

    fireEvent.change(emailInput, { target: { value: 'eve.holt@reqres.in' } });
    fireEvent.change(passwordInput, { target: { value: 'cityslicka' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      });
    });
  });

  it('should log an error to the console when the API returns an error', async () => {
    const mockErrorResponse = { error: 'Missing password' };
    const error = { response: { data: mockErrorResponse } };
    vi.spyOn(axios, 'post').mockRejectedValueOnce(error);

    render(
      <TestWrapper>
        <Auth />
      </TestWrapper>,
    );

    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const submitButton = screen.getByTestId('submitButton');

    fireEvent.change(emailInput, { target: { value: 'peter@klaven.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const {
        userData: { error },
      } = store.getState();
      expect(error).toEqual(mockErrorResponse.error);
    });
  });

  it('should display error message and validation status when email is invalid', async () => {
    render(
      <TestWrapper>
        <Auth />
      </TestWrapper>,
    );

    const emailInput = screen.getByTestId('emailInput');
    const submitButton = screen.getByTestId('submitButton');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    const warnerText = await screen.findByText('Formato de email inválido');

    expect(warnerText).toBeInTheDocument();
  });

  it('shoud display error message when password is empty', async () => {
    render(
      <TestWrapper>
        <Auth />
      </TestWrapper>,
    );

    const passwordInput = screen.getByTestId('passwordInput');
    const submitButton = screen.getByTestId('submitButton');

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    const warnerText = await screen.findByText('A senha é obrigatória');

    expect(warnerText).toBeInTheDocument();
  });
});
