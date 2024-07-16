import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { Room } from './types';
import { firestore } from './main';

export const subscribeToRoomFromFirestore = (roomId: string, callback: (room: Room) => void) => {
    const roomRef = doc(firestore, 'rooms', roomId);
  
    return onSnapshot(roomRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const roomData = docSnapshot.data() as Room;
          callback(roomData);
        }
    });
};

export const fetchRoomFromFirestore = async (roomId: string): Promise<Room | null> => {
    const roomRef = doc(firestore, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);
    return roomSnap.exists() ? (roomSnap.data() as Room) : null;
};

export const updateRoomInFirestore = async (roomData: Room): Promise<void> => {
    const roomRef = doc(firestore, 'rooms', roomData.id);
    await setDoc(roomRef, roomData, { merge: true });
};
