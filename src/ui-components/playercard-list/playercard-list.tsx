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
            xs={12} // Full width on extra small screens
            sm={6}  // Half width on small screens
            md={4}  // One-third width on medium screens
            lg={3}  // One-fourth width on large screens
            sx={{ display: 'flex', justifyContent: 'center' }}
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
        <Typography sx={{ marginTop: 4, textAlign: 'center' }}>Spectators: {spectatorNames}</Typography>
      )}
    </Box>
  );
}

export default PlayerCardList;
