// react
import React, { useEffect, useState } from 'react';

// antComponents
import { Space, Table, Tag } from 'antd';

// components (fullName)
import { FullName } from './FullNameComponent/FullName';

// hooks
import { useUsersData } from '../../hooks/usersData/useUsersData';

// assests (styles & more)

// styles do TableStyle
import { StyledTable } from '../../assets/style/TableStyle/TableStyle';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nome Completo',
    key: 'name',
    render: (record) => <FullName recordData={record} />,
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Mais Detalhes</a>
      </Space>
    ),
  },
];

export const TableComponent = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      position: ['bottomCenter'],
      showTotal: (total) => `Total ${total} usuários`,
      current: 1,
      pageSize: 0,
      total: 0,
    },
  });

  const { data: usersData, isLoading } = useUsersData(tableParams.pagination.current);

  useEffect(() => {
    if (!isLoading) {
      setTableParams({
        pagination: {
          position: ['bottomCenter'],
          showTotal: (total) => `Total ${total} usuários`,
          current: usersData.page,
          pageSize: usersData.per_page,
          total: usersData.total,
        },
      });
    }
  }, [isLoading, usersData]);

  const handleChangePage = (pagination, filters) => {
    setTableParams({
      pagination,
      filters,
    });
  };

  return (
    <StyledTable
      id="my-table"
      columns={columns}
      dataSource={usersData?.data}
      pagination={tableParams?.pagination}
      onChange={handleChangePage}
      loading={isLoading}
    />
  );
};
