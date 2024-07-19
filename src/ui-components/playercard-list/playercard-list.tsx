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
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',       // 1 column on extra small screens
            sm: 'repeat(2, 1fr)', // 2 columns on small screens
            md: 'repeat(3, 1fr)', // 3 columns on medium screens
            lg: 'repeat(4, 1fr)', // 4 columns on large screens
          },
          gap: 2,
          width: '100%',
          padding: 2,
        }}
      >
        {users.filter(user => user.role === PlayerType.Player).map((user) => (
          <Grid item key={user.id} sx={{ display: 'flex', justifyContent: 'center' }}>
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
