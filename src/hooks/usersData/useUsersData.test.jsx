import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsersData } from './useUsersData';
import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usersDataApi } from '../../services/users';

vi.mock('axios');
vi.mock('../../services/users', () => ({
  usersDataApi: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useUsersData Hook', () => {
  it('should get a list of users', async () => {
    const { result } = renderHook(() => useUsersData(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));
  });

  it('should get a list of users when the API call is successful', async () => {
    const mockUsersData = {
      data: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
      ],
      page: 1,
      per_page: 2,
      total: 4,
    };

    vi.mocked(usersDataApi).mockResolvedValue(mockUsersData);

    const { result } = renderHook(() => useUsersData(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockUsersData);
    expect(usersDataApi).toHaveBeenCalledWith(1);

    const { data } = await usersDataApi(1);
    expect(data).toEqual(mockUsersData.data);
  });

  it('should not fetch data when page is undefined', async () => {
    const { result } = renderHook(() => useUsersData(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
