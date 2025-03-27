import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { usersDataApi } from '../../../services/users';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { FullName } from './FullName';

const mockRecordData = vi.fn(usersDataApi).mockImplementation(async () => {
  return [
    {
      first_name: 'John',
      last_name: 'Lennon',
      avatar: faker.image.avatar(),
    },
    {
      first_name: 'Freddie',
      last_name: 'Mercury',
      avatar: faker.image.avatar(),
    },
  ];
});

describe('FullName Component', () => {
  it('should render a list of avatar images', async () => {
    render(<FullName recordData={mockRecordData} />);

    const avatarList = await screen.findAllByRole('img');

    expect(avatarList).toHaveLength(2);
  });
});
