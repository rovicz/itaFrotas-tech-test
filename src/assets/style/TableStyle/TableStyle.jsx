import { Image, Table } from 'antd';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  overflow: auto;
`;

const FullNameContainer = styled.div`
  display: flex;
  align-items: center;
  width: 170px;
  gap: 0.625rem;

  @media (max-width: 600px) {
    width: auto;
  }
`;

const UserImage = styled(Image)`
  display: flex;
  border-radius: 50%;
  width: 2.5rem !important;
  height: 2.5rem !important;
  object-fit: cover;
`;

export { StyledTable, FullNameContainer, UserImage };
