import React, { useState } from 'react';
import { TextField, Button, List, ListItem, Container, Typography, Box, FormHelperText, Divider } from '@mui/material';
import { PlayerType, UserStory } from '../../types';
import Story from '../story/story';

interface UserStoryListProps {
  userStories: UserStory[];
  userRole: PlayerType;
  onAddStory: (story: UserStory) => void;
  onRemoveStory: (storyId: string) => void;
  onVoteStory: (storyId: string) => void;
  onSetEstimateStory: (estimate: number) => void;
}

const UserStoryList: React.FC<UserStoryListProps> = ({ userStories, onAddStory, onRemoveStory, onVoteStory, onSetEstimateStory, userRole }) => {
  const [newStoryId, setNewStoryId] = useState('');
  const [newStoryDescription, setNewStoryDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddStory = () => {
    if (!newStoryId) {
      setError('Story Id is required');
      return;
    }

    if (userStories.findIndex(story => story.id === newStoryId) !== -1) {
      setError('Story Id already exists');
      return;
    }
    const story: UserStory = {
      id: newStoryId,
      description: newStoryDescription,
      votes: {},
      storyPoints: null,
    };

    onAddStory(story);
    setNewStoryId('');
    setNewStoryDescription('');
    setError(null);
  };

  const handleRemoveStory = (storyId: string) => {
    onRemoveStory(storyId);
  };

  const handleVoteStory = (storyId: string) => {
    onVoteStory(storyId);
  };

  const handleSetEstimateStory = (estimate: number) => {
    onSetEstimateStory(estimate)
  }

  return (
    <Container>
      <Box>
        <Typography variant="h6">User Stories</Typography>     
        {userRole === PlayerType.Spectator && (
          <Box display="flex" flexDirection="column" width="100%" maxWidth="300px" margin="0 auto">
            <TextField 
              label="Story Id" 
              value={newStoryId} 
              onChange={(e) => setNewStoryId(e.target.value)} 
              margin="normal"
              fullWidth
              error={!!error}
              required
              inputProps={{ maxLength: 20 }}
            />
            {error && (
              <FormHelperText error>{error}</FormHelperText>
            )}
            <TextField 
              label="Description" 
              value={newStoryDescription} 
              onChange={(e) => setNewStoryDescription(e.target.value)} 
              margin="normal"
              fullWidth
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddStory}
              fullWidth
              style={{ marginTop: '16px', marginBottom: '16px' }}
            >
              Add Story
            </Button>
          </Box>
        )}
        <Divider />
        <List>
          {userStories.map((story) => (
            <ListItem key={story.id}>
              <Story
                userStory={story}
                userRole={userRole}
                onRemoveStory={handleRemoveStory}
                onVoteStory={handleVoteStory}
                onSetEstimateStory={handleSetEstimateStory}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default UserStoryList;
