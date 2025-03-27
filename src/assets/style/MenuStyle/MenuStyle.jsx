import { Button, Popover } from 'antd';
import styled from 'styled-components';

const StyledPopover = styled(Popover)`
  .ant-popover-inner {
    padding: 0;
  }
`;

const StyledPopoverEmailButton = styled(Button)`
  border: none;
  box-shadow: none;
`;

const StyledLogoutButton = styled(Button)`
  min-width: 220px;
  justify-content: start;
  min-height: 40px;
`;

export { StyledPopover, StyledPopoverEmailButton, StyledLogoutButton };
