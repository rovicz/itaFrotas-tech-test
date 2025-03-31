// react
import React from 'react';

// componentes (Table e Menu)
import { MenuComponent } from '../../components/Menu/MenuComponent';
import { TableComponent } from '../../components/Table/Table';

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
