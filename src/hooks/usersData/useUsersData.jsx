import { useQuery } from '@tanstack/react-query';
import { usersDataApi } from '../../services/users';

export const useUsersData = (page) => {
  return useQuery({
    queryKey: ['usersData', page],
    queryFn: async () => {
      const usersDataRes = usersDataApi(page);
      return usersDataRes;
    },
    enabled: !!page,
    refetchOnWindowFocus: false,
    refetchInterval: 60000 * 5, // 5 minutos
  });
};
