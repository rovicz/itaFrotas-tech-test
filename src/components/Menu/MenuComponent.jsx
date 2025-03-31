// react
import React, { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/authSlice';

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
  const dispatch = useDispatch();
  const email = useSelector((state) => state.userData.userData.email);

  const handlePopoverVisibility = (visible) => {
    setIsPopoverVisible(visible);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <StyledPopover
      content={<StyledLogoutButton onClick={handleLogout}>Sair</StyledLogoutButton>}
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
