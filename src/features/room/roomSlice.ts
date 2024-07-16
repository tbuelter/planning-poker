import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateRoomInFirestore } from '../../firestore-utils';
import { Room, UserStory, User } from '../../types';

interface RoomState {
  room: Room | null;
}

const initialState: RoomState = {
  room: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    /**
     * Adds a unique user story to the room's user stories.
     * If a story with the same ID already exists, it will not be added.
     * @param state - The current room state.
     * @param action - The action containing the user story to be added.
     */
    addUniqueUserStory: (state, action: PayloadAction<UserStory>) => {
      if (state.room?.userStories.findIndex(story => story.id === action.payload.id) === -1) {
        state.room?.userStories.push(action.payload);
        updateRoomInFirestore(state.room);
      }
    },

    /**
     * Updates a user story in the room's user stories using the story ID.
     * @param state - The current room state.
     * @param action - The action containing the updated user story.
     */
    updateStory: (state, action: PayloadAction<UserStory>) => {
      if (state.room) {  
        const storyIndex = state.room.userStories.findIndex(story => story.id === action.payload.id);
        if (storyIndex !== -1) {
          state.room.userStories[storyIndex] = action.payload;
          updateRoomInFirestore(state.room);
        }
      }
    },

    /**
     * Removes a user story from the room's user stories using the story ID.
     * @param state - The current room state.
     * @param action - The action containing the ID of the user story to be removed.
     */
    removeUserStoryById: (state, action: PayloadAction<string>) => {     
      if (state.room) {
        state.room.userStories.splice(
          state.room.userStories.findIndex(story => story.id === action.payload),
          1
        );
        updateRoomInFirestore(state.room);
      }
    },

    /**
     * Sets the current user story ID for the room.
     * @param state - The current room state.
     * @param action - The action containing the ID of the user story to be set as current.
     */
    setCurrentUserStory: (state, action: PayloadAction<string>) => {
      if (state.room) {
        state.room.currentUserStoryId = action.payload;
        updateRoomInFirestore(state.room);
      }
    },

    /**
     * Updates the voted state of the room.
     * @param state - The current room state.
     * @param action - The action containing the new voted state.
     */
    updateVotedState: (state, action: PayloadAction<boolean>) => {
      if (state.room) {
        state.room.voted = action.payload;
        updateRoomInFirestore(state.room);
      }
    },

    /**
     * Adds or updates a user in the room.
     * If the user already exists, it updates the user data.
     * @param state - The current room state.
     * @param action - The action containing the user to be added or updated.
     */
    addOrUpdateUser: (state, action: PayloadAction<User>) => {
      if (state.room) {
        const existingUserIndex = state.room.users.findIndex(user => user.id === action.payload.id);
        if (existingUserIndex !== -1) {
          state.room.users[existingUserIndex] = action.payload;
        } else {
          state.room.users.push(action.payload);
        }
        updateRoomInFirestore(state.room);
      }
    },

    /**
     * Removes a user from the room using the user ID.
     * @param state - The current room state.
     * @param action - The action containing the user to be removed.
     */
    removeUserById: (state, action: PayloadAction<User>) => {
      if (state.room) {
        state.room.users.splice(
          state.room.users.findIndex(user => user.id === action.payload.id),
          1
        );
        updateRoomInFirestore(state.room);
      }
    },

    /**
     * Sets and updates the list of users in the room.
     * Removes users that are no longer in the payload and adds new users.
     * @param state - The current room state.
     * @param action - The action containing the updated list of users.
     */
    setAndUpdateUsers: (state, action: PayloadAction<User[]>) => {
      if (state.room) {  
        // Remove users that are no longer in the payload
        state.room.users = state.room.users.filter(existingUser =>
          action.payload.some(newUser => newUser.id === existingUser.id)
        );
    
        // Add new users that are not already in state.room.users
        action.payload.forEach(newUser => {
          if(state.room){
            if (!state.room.users.some(existingUser => existingUser.id === newUser.id)) {
              state.room.users.push(newUser);
            }
          }
        });
      
        // Update room in Firestore
        updateRoomInFirestore(state.room);
      }
    },

    /**
     * Updates the room state with the given room data.
     * @param state - The current room state.
     * @param action - The action containing the new room data.
     */
    updateRoomState: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },

    /**
     * Updates the room state with the given room data and saves it to Firestore.
     * @param state - The current room state.
     * @param action - The action containing the new room data.
     */
    updateRoomStateAndFireStore: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
      updateRoomInFirestore(state.room);
    },
  },
});

export const { 
  addUniqueUserStory, 
  updateStory, 
  removeUserStoryById, 
  setCurrentUserStory, 
  updateVotedState, 
  addOrUpdateUser, 
  removeUserById, 
  setAndUpdateUsers, 
  updateRoomState, 
  updateRoomStateAndFireStore,
} = roomSlice.actions;

export default roomSlice.reducer;
