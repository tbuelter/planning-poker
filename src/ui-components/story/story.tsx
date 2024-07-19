import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Badge,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { PlayerType, UserStory } from '../../types';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

interface UserStoryProps {
  userStory?: UserStory;
  userRole: PlayerType;
  onRemoveStory: (storyId: string) => void;
  onSetEstimateStory: (estimate: number) => void;
  onVoteStory?: (storyId: string) => void;
}

const Story: React.FC<UserStoryProps> = ({
  userStory,
  userRole,
  onRemoveStory,
  onSetEstimateStory,
  onVoteStory,
}) => {
  const [open, setOpen] = useState(false);
  const [estimate, setEstimate] = useState<number | null>(null);

  if (!userStory) return null;

  const inDisplay = !!!onVoteStory;

  const handleRemoveStory = () => {
    onRemoveStory(userStory.id);
  };

  const handleVoteStory = () => {
    if (!inDisplay) onVoteStory(userStory.id);
  };

  const handleSetEstimateStory = () => {
    setOpen(true);
  };

  const handleEstimateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimate(Number(event.target.value));
  };

  const handleClose = () => {
    setOpen(false);
    setEstimate(null);
  };

  const handleSubmit = () => {
    if (estimate !== null) {
      onSetEstimateStory(estimate);
    }
    handleClose();
  };

  return (
    <Container sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          width: '100%',
          maxWidth: 345,
          minWidth: 320,
          margin: 'auto',
          '@media (max-width: 600px)': {
            maxWidth: '100%',
            minWidth: '100%',
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              {userStory.id}
            </Typography>
            <Badge color="secondary" badgeContent={userStory.storyPoints}>
              <EditCalendarIcon />
            </Badge>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {userStory.description}
          </Typography>
        </CardContent>

        {userRole === PlayerType.Spectator && (
          <CardActions>
            {!inDisplay && <Button size="small" onClick={handleVoteStory}>Vote</Button>}
            <Button size="small" onClick={handleSetEstimateStory}>Set Estimate</Button>
            <Button size="small" onClick={handleRemoveStory}>Remove</Button>
          </CardActions>
        )}
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set Estimate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the estimate for the story.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="estimate"
            label="Estimate"
            type="number"
            fullWidth
            variant="standard"
            value={estimate !== null ? estimate : ''}
            onChange={handleEstimateChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Story;
