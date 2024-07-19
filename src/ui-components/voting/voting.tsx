import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { UserStory, User, PlayerType } from '../../types';

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
    <Box sx={{ padding: 5 }}>
      {currentUserStory ? (
        <Box>
          {currentUser.role === PlayerType.Spectator ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={voted ? onResetVote : onEndVote}
              sx={{
                width: '100%',
                border: '1px solid',   
                borderColor: 'secondary.main', 
              }}
            >
              {voted ? 'Reset Vote' : 'End Vote'}
            </Button>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {fibonacci.map((num) => (
                <Button
                  key={num}
                  onClick={() => onVote(num)}
                  sx={{ 
                    flexBasis: { xs: '100%', sm: 'auto' }, 
                    maxWidth: 80,
                    border: '1px solid',  
                    borderColor: 'primary.main', 
                  }}
                >
                  {num}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      ) : (
        <Typography variant="body1" align="center">
          No story selected for voting
        </Typography>
      )}
    </Box>
  );
};

export default Voting;
