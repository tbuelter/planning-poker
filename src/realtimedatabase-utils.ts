import { ref, onDisconnect, set, onValue } from 'firebase/database';
import { User } from './types';
import { Dispatch } from 'react';
import { setAndUpdateUsers } from './features/room/roomSlice';
import { database } from './main';

export const trackUserPresence = (roomId: string, currentUser: User, dispatch: Dispatch<any>) => {
  const userStatusDatabaseRef = ref(database, `rooms/${roomId}/users/${currentUser.id}`);

  const isOnlineForDatabase = currentUser

  // Remove user from the list when they disconnect
  onDisconnect(userStatusDatabaseRef).remove().then(() => {
    // Add user to the database when they connect
    set(userStatusDatabaseRef, isOnlineForDatabase);
  });

  // Listen for changes to the user's status
  onValue(userStatusDatabaseRef, (snapshot) => {
    // Fetch and dispatch the updated room data from Realtime Database
    const roomRef = ref(database, `rooms/${roomId}`);
    onValue(roomRef, (roomSnapshot) => {
      if(roomSnapshot.val()){
        const users: User[] = Object.values(roomSnapshot.val().users);
        dispatch(setAndUpdateUsers(users)); // CurrentVote is lost on all users
      }
    });
  });
};
