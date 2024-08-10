import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { ReactSVG } from 'react-svg';
import CloseIcon from '@mui/icons-material/Close';
import { PlayerType, User } from '../../types';

// Import SVG icons
import clubSVG from '../../assets/suits/black-ace.svg';
import { RootState } from '../../store';

interface PlayerCardProps {
  user: User;
  rank: number | null;
  suit: 'hearts' | 'spades' | 'diamonds' | 'clubs';
  showBackside: boolean;
  onRemoveUser: (user: User) => void;
}

enum SuitIconSize {
  Small = 'small',
  Large = 'large'
}

// Function to get SVG icon based on suit
const getSuitIcon = (suit: string, size: SuitIconSize) => {
  const iconStyle = { width: size === 'small' ? '25px' : '45px'};

  switch (suit) {
    case 'clubs':
      return <ReactSVG src={clubSVG} style={iconStyle} />;
    default:
      return null;
  }
}

const PlayerCard: React.FC<PlayerCardProps> = ({ user, rank, suit, showBackside, onRemoveUser }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  
  const getBackSideColor = () => {
     return (user.currentVote || user.currentVote === 0) ? '5px solid #4caf50' : '5px solid #ff2c2c'  
  }

  return (
    <Card sx={{
      width: 200 / 1.3,
      height: 300 / 1.3,
      borderRadius: 4,
      border: '1px solid #ccc',
      background: '#f0f0f1',
      position: 'relative',
      padding: 1,
      boxShadow: 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minWidth: 200/1.3
    }}>
      {currentUser?.role === PlayerType.Spectator && (
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: '2' }}>
          <Tooltip title="Remove player from the room">
            <IconButton size="small" aria-label="remove" onClick={() => onRemoveUser(user)} >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <CardContent sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '16px', 
        boxSizing: 'border-box', 
        wordWrap: 'break-word', 
      }}>
        <Typography variant="h6" sx={{
            fontWeight: 'bold',
            color: '#333',
            width: '100%',  
          }}>
          {user.name}
        </Typography>
      </CardContent>

      {!showBackside ? (
        <>
          <Box sx={{
            position: 'absolute',
            top: 12,
            left: 12,
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
              {rank}
            </Typography>
            {getSuitIcon(suit, SuitIconSize.Small)}
          </Box>

          <Box sx={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            transform: 'rotate(180deg)',
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
              {rank}
            </Typography>
            {getSuitIcon(suit, SuitIconSize.Small)}
          </Box>
        </>
      ) : (
        <Box>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            content: '""',
            width: '100%',
            height: '100%',
            border: getBackSideColor(),  // Adjust color as needed
            transform: 'rotate(45deg)'
          }} />

          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            content: '""',
            width: '100%',
            height: '100%',
            border: getBackSideColor(),  // Adjust color as needed
            transform: 'rotate(-45deg)'
          }} />
        </Box>
      )}
    </Card>
  );
}

export default PlayerCard;
