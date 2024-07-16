// libs/ui-components/src/components/Voting.tsx
import React from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { UserStory, User, PlayerType } from '../../types'

interface VotingProps {
  currentUserStory?: UserStory;
  currentUser: User;
  voted: boolean;
  onVote: (value: number) => void;
  onEndVote: () => void;
  onResetVote: () => void;
}

const Voting: React.FC<VotingProps> = ({ currentUserStory, currentUser, voted, onVote, onEndVote, onResetVote }) => {
  const fibonacci = [0, 0.5, 1, 2, 3, 5, 8, 13, 21];

  return (
    <Box sx={{padding: 5}}>
      {currentUserStory ? (
        <Box>          
          {currentUser.role === PlayerType.Spectator ? (
            ( voted ?
            <Button variant="contained" color="secondary" onClick={onResetVote}>Reset Vote</Button>
             : <Button variant="contained" color="secondary" onClick={onEndVote}>End Vote</Button> )
          ) : (
            <ButtonGroup>
              {fibonacci.map((num) => (
                <Button key={num} onClick={() => onVote(num)}>
                  {num}
                </Button>
              ))}
            </ButtonGroup>)
          }    
        </Box>
      ) : (
        <Typography variant="body1">No story selected for voting</Typography>
      )}
    </Box>
  );
};

export default Voting;
