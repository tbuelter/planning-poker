import { Box, Typography, List, ListItem } from '@mui/material';
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <List sx={{ display: 'flex', flexDirection: 'row', padding: 0, overflowX: 'auto' }}>
          {users.filter(user => user.role === PlayerType.Player).map((user) => (
            <ListItem key={user.id} sx={{ display: 'inline-flex', justifyContent: 'center' }}>
              <PlayerCard
                user={user}
                rank={user.currentVote}
                suit="clubs"
                showBackside={showBackside}
                onRemoveUser={onRemoveUser}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      {spectatorNames && (
        <Typography sx={{ marginTop: 2, textAlign: 'center' }}>Spectators: {spectatorNames}</Typography>
      )}
    </Box>
  );
}

export default PlayerCardList;
