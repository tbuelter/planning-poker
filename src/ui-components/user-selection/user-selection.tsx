import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Dialog, DialogTitle, DialogContent, DialogActions, Box, FormHelperText } from '@mui/material';
import { PlayerType, User } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface UserSelectionProps {
  onUserSelect: (user: User) => void;
}

const UserSelection: React.FC<UserSelectionProps> = ({ onUserSelect }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [name, setName] = useState(currentUser?.name || '');
  const [role, setRole] = useState<PlayerType>(PlayerType.Player);
  const [open, setOpen] = useState(true);
  const [missingName, setMissingName] = useState(false);

  useEffect(() => {
    if (currentUser?.name) {
      setName(currentUser.name);
    }
  }, [currentUser]);

  const handleSubmit = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      role,
      currentVote: null,
    };

    if(name) {
      setMissingName(false);
      onUserSelect(newUser);
      setOpen(false);
    } else {
      setMissingName(true);
    }
  };

  return (
    <Container>
      <Dialog disableEscapeKeyDown open={open}>
        <DialogContent>
          <DialogTitle>Choose your Role and enter your Name</DialogTitle>
          <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                sx={{ m: 1, minWidth: 120 }}
                value={role}
                label='Player'
                onChange={(e) => setRole(e.target.value as PlayerType)}
              >
                <MenuItem value='player'>Player</MenuItem>
                <MenuItem value='spectator'>Spectator</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant='standard'>
              <TextField
                label='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ m: 1, minWidth: 120 }}
                required
                error={missingName}
                inputProps={{ maxLength: 20 }}
              />
              {missingName && <FormHelperText error>Enter your name</FormHelperText>}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='primary' onClick={handleSubmit}>Join Room</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserSelection;
