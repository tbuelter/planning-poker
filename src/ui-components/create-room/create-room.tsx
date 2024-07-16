import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Box, Typography } from '@mui/material';

interface CreateRoomComponentProps {
  onCreateRoom: (id: string, name: string) => void;
}

const CreateRoomComponent: React.FC<CreateRoomComponentProps> = ({ onCreateRoom }) => {
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = () => {
    if (roomName.trim() !== '') {
      onCreateRoom(uuidv4(), roomName);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Create a New Room
      </Typography>
      <TextField
        label="Room Name"
        variant="outlined"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateRoom}
      >
        Create Room
      </Button>
    </Box>
  );
};

export default CreateRoomComponent;
