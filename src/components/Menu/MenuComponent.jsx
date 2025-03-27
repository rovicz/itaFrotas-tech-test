// react
import React, { useState } from 'react';

// js-cookies
import Cookies from 'js-cookie';

// antIcons
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { StyledButton } from '../../assets/style/ComponentsStyle';

// assets (images, styles & more)

// styles do MenuStyle
import {
  StyledLogoutButton,
  StyledPopover,
  StyledPopoverEmailButton,
} from '../../assets/style/MenuStyle/MenuStyle';

export const MenuComponent = () => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const email = Cookies.get('email');

  const handlePopoverVisibility = (visible) => {
    setIsPopoverVisible(visible);
  };

  return (
    <StyledPopover
      content={<StyledLogoutButton>Sair</StyledLogoutButton>}
      open={isPopoverVisible}
      onOpenChange={handlePopoverVisibility}
    >
      <StyledPopoverEmailButton>
        <span id="mail">{email}</span>{' '}
        {isPopoverVisible ? (
          <DownOutlined id="downIcon" style={{ fontSize: '12px' }} />
        ) : (
          <UpOutlined style={{ fontSize: '12px' }} />
        )}
      </StyledPopoverEmailButton>
    </StyledPopover>
  );
};
