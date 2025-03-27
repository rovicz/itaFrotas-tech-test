// react
import React from 'react';

// assets (images, styles & more)

// styles do TableStyle
import { FullNameContainer, UserImage } from '../../../assets/style/TableStyle/TableStyle';

export const FullName = ({ recordData }) => {
  return (
    <FullNameContainer key={recordData.first_name}>
      <UserImage src={recordData.avatar} alt={recordData.first_name} />
      {recordData.first_name} {recordData.last_name}
    </FullNameContainer>
  );
};
