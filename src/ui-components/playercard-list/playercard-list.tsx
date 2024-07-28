import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { PlayerType, User } from '../../types';
import PlayerCard from '../playercard/playercard';

interface PlayerCardListProps {
  users: User[];
  showBackside: boolean;
  onRemoveUser: (user: User) => void;
}

// List all Players
const PlayerCardList: React.FC<PlayerCardListProps> = ({ users, showBackside, onRemoveUser }) => {
  // Filter spectators and map their names
  const spectatorNames = users
    .filter(user => user.role === PlayerType.Spectator)
    .map(user => user.name)
    .join(', ');

  return (
    <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
        >
          {users.filter(user => user.role === PlayerType.Player).map(user => (
            <Grid item key={user.id} xs={12} sm={4} md={4} lg={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <PlayerCard
                user={user}
                rank={user.currentVote}
                suit="clubs"
                showBackside={showBackside}
                onRemoveUser={onRemoveUser}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ marginTop: 2, width: '100%', textAlign: 'center' }}>
        {spectatorNames && (
          <Typography>Spectators: {spectatorNames}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default PlayerCardList;
