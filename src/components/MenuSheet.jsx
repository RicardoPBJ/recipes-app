import * as React from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { AiOutlineUser } from 'react-icons/ai';
import Profile from './Profile';

export default function MenuSheet() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={ open ? 'basic-menu' : undefined }
        aria-haspopup="true"
        aria-expanded={ open ? 'true' : undefined }
        onClick={ handleClick }
      >
        <AiOutlineUser
          className="icons"
          alt="profile-icon"
          data-testid="profile-top-btn"
          size={ 43 }
          color="black"
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleClose }
        MenuListProps={ {
          'aria-labelledby': 'basic-button',
        } }
        sx={ {
          '& .MuiMenu-paper': {
            backgroundColor: 'rgb(241, 229, 211)',
            blockSize: '13em',
            inlineSize: '15em',
            borderRadius: '0.5em',
          },
        } }
      >
        <Profile />
      </Menu>
    </div>
  );
}
