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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: 'center',
          width: '100%',
          padding: 2,
        }}
      >
        {users.filter(user => user.role === PlayerType.Player).map((user) => (
          <Grid
            item
            key={user.id}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flex: {
                xs: '0 1 100%', // Full width on extra small screens
                sm: '0 1 calc(50% - 16px)', // Half width on small screens, accounting for spacing
                md: '0 1 calc(33.33% - 16px)', // Third width on medium screens, accounting for spacing
                lg: '0 1 calc(25% - 16px)', // Quarter width on large screens, accounting for spacing
              },
            }}
          >
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
      {spectatorNames && (
        <Typography sx={{ marginTop: 2, textAlign: 'center' }}>Spectators: {spectatorNames}</Typography>
      )}
    </Box>
  );
}

export default PlayerCardList;
