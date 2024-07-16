import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Room from './features/room/Room';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import CreateRoomPage from './features/room/CreateRoomPage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const database = getDatabase(app);

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
       <CssBaseline />
        <BrowserRouter>
          <Routes>     
            <Route path='/room/:roomId' element={<Room />}/>
            <Route path='/room/create' element={<CreateRoomPage />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}