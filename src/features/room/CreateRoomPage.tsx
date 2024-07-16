import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateRoomStateAndFireStore } from './roomSlice';
import { Box } from '@mui/material';
import CreateRoomComponent from '../../ui-components/create-room/create-room';

const CreateRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateRoom = (id: string, name: string) => {
    dispatch(updateRoomStateAndFireStore({
        id: id,
        name: name,
        users: [],
        userStories: [],
        voted: false
    }));
    navigate(`/room/${id}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CreateRoomComponent onCreateRoom={handleCreateRoom} />
    </Box>
  );
};

export default CreateRoomPage;
