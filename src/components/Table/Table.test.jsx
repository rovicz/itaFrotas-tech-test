import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TableComponent } from './Table';
import { useUsersData } from '../../hooks/usersData/useUsersData';

// Mock do hook useUsersData
vi.mock('../../hooks/usersData/useUsersData', () => ({
  useUsersData: vi.fn(),
}));

describe('Table Component', () => {
  it('should render a table with columns and data', async () => {
    const mockUsersData = {
      data: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        {
          id: 2,
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
        },
      ],
      page: 1,
      per_page: 10,
      total: 2,
    };

    vi.mocked(useUsersData).mockReturnValue({
      data: mockUsersData,
      isLoading: false,
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <TableComponent />
      </QueryClientProvider>,
    );

    const table = await screen.findByRole('table');

    console.log(table);
    expect(table).toBeInTheDocument();

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Nome Completo')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();

    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane.doe@example.com')).toBeInTheDocument();

    expect(screen.getByText('Total 2 usuários')).toBeInTheDocument();
  });

  it('should handle pagination change correctly', async () => {
    // Mock dos dados retornados pelo hook useUsersData
    const mockUsersData = {
      data: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
      ],
      page: 2,
      per_page: 2,
      total: 4,
    };

    // Mock do hook useUsersData para retornar os dados simulados
    vi.mocked(useUsersData).mockReturnValue({
      data: mockUsersData,
      isLoading: false,
    });

    // Renderiza o componente
    render(
      <QueryClientProvider client={new QueryClient()}>
        <TableComponent />
      </QueryClientProvider>,
    );

    // Encontra o botão de próxima página (ajuste conforme o componente de paginação)
    const nextPageButton = await screen.findAllByRole('listitem');

    // Simula o clique no botão de próxima página
    fireEvent.click(nextPageButton[1]);

    // Verifica se a função handleChangePage foi chamada com os parâmetros corretos
    // Aqui, você pode verificar se o estado da tabela foi atualizado corretamente
    // ou se a função useUsersData foi chamada com os novos parâmetros de paginação.

    // Exemplo: Verifica se o hook useUsersData foi chamado com a nova página
    expect(useUsersData).toHaveBeenCalledWith(2); // Página 2
  });
});
