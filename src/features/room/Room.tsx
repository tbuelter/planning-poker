import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  RootState } from '../../store';
import { addUniqueUserStory, updateRoomState, addOrUpdateUser, removeUserStoryById, setCurrentUserStory, updateVotedState, updateRoomStateAndFireStore, updateStory, removeUserById } from './roomSlice';
import { setCurrentUser } from '../user/userSlice';
import { UserStory, User } from '../../types';
import { Box, Typography, IconButton, Drawer, Button, AppBar, Toolbar, CircularProgress, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { fetchRoomFromFirestore, subscribeToRoomFromFirestore } from '../../firestore-utils';
import { trackUserPresence } from '../../realtimedatabase-utils';
import PlayerCardList from '../../ui-components/playercard-list/playercard-list';
import Story from '../../ui-components/story/story';
import UserSelection from '../../ui-components/user-selection/user-selection';
import UserStoryList from '../../ui-components/user-story-list/user-story-list';
import Voting from '../../ui-components/voting/voting';
import { off } from 'process';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userSelectionOpen, setUserSelectionOpen] = useState(false);
  const [averageVote, setAverageVote] = useState<number>(0);

  const room = useSelector((state: RootState) => state.room.room);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!roomId) {
    throw Error(); // TODO: redirect to create room
  }  
  
  
  // Load User from Localstorage
  useEffect(() => {    
    if (!currentUser) {
      const storedUser = localStorage.getItem(roomId);
      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        if (user) {
          dispatch(setCurrentUser(user));
          trackUserPresence(roomId, user, dispatch)
        }
      }
  }
  }, [roomId, currentUser, dispatch]);

  // Handle new user creation from the Login Modal
  const handleUserSelect = (user: User) => {
    dispatch(setCurrentUser(user));
    dispatch(addOrUpdateUser(user));
    trackUserPresence(roomId, user, dispatch)    
    localStorage.setItem(roomId, JSON.stringify(user));
    setUserSelectionOpen(false);
  };

  // Handle user update from the Login Modal
  const handleUpdateUser = (user: User) => {
    if(currentUser){
      const newUser: User = {
        id: currentUser.id,
        name: user.name,
        role: user.role,
        currentVote: user.currentVote
      }
      dispatch(setCurrentUser(newUser));
      dispatch(addOrUpdateUser(newUser));
      localStorage.setItem(roomId, JSON.stringify(newUser));
      setUserSelectionOpen(false);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToRoomFromFirestore(roomId, (fetchedRoom) => {
      dispatch(updateRoomState(fetchedRoom));
      if (currentUser) {
        const fetchedUser = fetchedRoom.users.find(user => user.id === currentUser.id) 
          if(fetchedUser?.kicked === true){
            dispatch(removeUserById(fetchedUser))
            localStorage.removeItem(roomId);
            window.location.reload(); // unmount and unsubscribe from db
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [roomId, dispatch, currentUser, navigate]);

  // Load Room from Firestore
  useEffect(() => {
    const loadRoom = async () => {
      const fetchedRoom = await fetchRoomFromFirestore(roomId);
      if (fetchedRoom) {
        dispatch(updateRoomState(fetchedRoom));
      }
    };

    if (!room) {
      loadRoom();
    }
  }, [roomId, room, dispatch]);

  
  const calculateAverageVote = () => {
    if(room && room.users){
      if (room.currentUserStoryId) {
        const story = room.userStories.find(story => story.id === room.currentUserStoryId);
        if (story) {
          const votes = room.users
            .filter(user => user.currentVote !== undefined)
            .map(user => user.currentVote as number); 

          if (votes.length > 0) {
            const sum = votes.reduce((acc, vote) => acc + vote, 0);
            return sum / votes.length;
          }
        }
      }
    }
    return 0;
  };

  useEffect(() => {
    setAverageVote(calculateAverageVote())
  }, [room?.users]);


  const handleAddStory = (story: UserStory) => {
    dispatch(addUniqueUserStory(story));
  };

  const handleRemoveStory = (storyId: string) => {
    dispatch(removeUserStoryById(storyId));
  };

  const handleSetCurrentUserStory = (storyId: string) => {
    dispatch(setCurrentUserStory(storyId));
  };

  const handleEndVote = () => {
    dispatch(updateVotedState(true))
  };
  
  const handleResetVote = () => {
    dispatch(updateVotedState(false))
  };

  const handleRemoveUser = (user: User) => {
    dispatch(addOrUpdateUser({ ...user, kicked: true }))
  };

  const handleSetEstimate = (estimate: number) => {
    const story = findCurrentUserStory();
    if (story) {
      const updatedStory = { ...story, storyPoints: estimate };
      dispatch(updateStory(updatedStory));
    }
  };

  const handleVote = (value: number) => {
    if (!room || !currentUser) return;
  
    // Update the user's current vote
    const updatedUsers = room.users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          currentVote: value,
        };
      }
      return user;
    });
  
    // Update the user stories with the new vote
    const updatedUserStories = room.userStories.map(story => {
      if (story.id === room.currentUserStoryId) {
        return {
          ...story,
          votes: {
            ...story.votes,
            [currentUser.name]: value, // maybe ID and user?
          },
        };
      }
      return story;
    });
  
    // Dispatch the updated room to the store
    dispatch(updateRoomStateAndFireStore({
      ...room,
      userStories: updatedUserStories,
      users: updatedUsers,
    }));
  };
  

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  if (!room) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" component="div" sx={{ ml: 2 }}>
          Loading room data...
        </Typography>
      </Box>
    );
  }

  if (!currentUser) {
    return <UserSelection onUserSelect={handleUserSelect}/>;
  }

  const findCurrentUserStory = () => {
      return room.userStories.find(story => story.id === room.currentUserStoryId)
  }
  
  return (
    <Box>
     <AppBar position="static">
      <Toolbar disableGutters sx={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {userSelectionOpen && (<UserSelection onUserSelect={handleUpdateUser} />)}
        {room.name && (
          <Typography sx={{ marginRight: 'auto' }}>Room Name: {room.name}</Typography>
        )}
        <Grid container spacing={1} justifyContent="flex-end" alignItems="center">
          <Grid item>
            <Button
              onClick={() => setUserSelectionOpen(true)}
              variant="contained"
              color="secondary"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 500,
                textDecoration: 'none',
                height: '40px', 
              }}
            >
              Settings
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={toggleDrawer(true)}
              variant="contained"
              color="secondary"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 500,
                textDecoration: 'none',
                height: '40px', 
              }}
            >
              Open User Stories
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', paddingTop: '64px', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Story userStory={findCurrentUserStory()} userRole={currentUser.role} onRemoveStory={handleRemoveStory} onSetEstimateStory={handleSetEstimate} />
      </Box>
      
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',  paddingBottom: '264px' }}>
        <Typography>Players</Typography>
        <PlayerCardList users={room.users} showBackside={!room.voted} onRemoveUser={handleRemoveUser}/>
        <Box sx={{ padding: '16px' }}>
        {room.voted && 
          <Typography variant="h6"> Average Vote: {averageVote.toFixed(1)}</Typography>  
        }
      </Box>
        <Voting 
          currentUserStory={room.userStories.find(story => story.id === room.currentUserStoryId)} 
          currentUser={currentUser} 
          voted={room.voted}
          onVote={handleVote} 
          onEndVote={handleEndVote} 
          onResetVote={handleResetVote}
        />
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          role="presentation"
        >
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: 'absolute', top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <UserStoryList 
            userStories={room.userStories}
            onAddStory={handleAddStory}
            userRole={currentUser.role}
            onRemoveStory={handleRemoveStory} 
            onVoteStory={handleSetCurrentUserStory}
            onSetEstimateStory={handleSetEstimate}
          />
        </Box>
      </Drawer>
    </Box>
  </Box>
  );
};

export default Room;
