// react
import React, { useEffect } from 'react';

// componentes (Table e Menu)
import { MenuComponent } from '../../components/Menu/MenuComponent';
import { TableComponent } from '../../components/Table/Table';

// js-cookies
import Cookies from 'js-cookie';

// react-router
import { useNavigate } from 'react-router';

// assets (images, styles & more)

// styles da HomeStyle
import { EnterpriseBox } from '../../assets/style/HomeStyle/HomeStyle';

// styles gerais do ComponentsStyle
import {
  BlueCricle,
  StyledContent,
  StyledHeader,
  StyledLayout,
  StyledSearchInput,
  Title,
} from '../../assets/style/ComponentsStyle';

export const Home = () => {
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [navigate, token]);

  return (
    <StyledLayout>
      <StyledHeader>
        <EnterpriseBox>
          <BlueCricle /> Nome da Empresa
        </EnterpriseBox>
        <MenuComponent />
      </StyledHeader>
      <StyledContent style={{ marginTop: '1.5rem', gap: '1rem' }}>
        <Title>Usuários</Title>
        <StyledSearchInput enterButton placeholder="Pesquise nome ou documento" />

        <TableComponent />
      </StyledContent>
    </StyledLayout>
  );
};
