# Real-Time Collaborative Voting App

Welcome to the Planning-Poker Voting App! 
This project is designed as a learning project for working with React, Firebase, and Redux.
It allows users to join rooms, participate in voting on various user stories and synchronize users in the same room in real time.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Demo](#demo)

## Features

- **Rooms**: Create and join rooms for collaborative voting sessions.
- **Users**: Each user has a unique ID, name, role, and vote.
- **User Stories**: Add and vote on user stories within a room.
- **Real-time Updates**: Sync room data and user states in real-time using Firebase Firestore.
- **Presence Tracking**: Track which users are currently in the room.
- **User Management**: Add or remove users from rooms and manage their voting status.
- **Kick User**: Spectators can remove users from the room, and the kicked users are redirected to a different page.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Redux**: State management library.
- **Firebase**: Backend platform for real-time data syncing and user authentication.
- **Material-UI**: React components for faster and easier web development.

## Getting Started

### Prerequisites

- Node.js and yarn installed on your machine.
- A Firebase project set up with Firestore Database and Firestore Realtime Database.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/tbuelter/planning-poker
    cd planning-poker
    ```

2. Install dependencies:
    ```sh
    yarn install
    ```

3. Set up Firebase configuration:

    Create a `.env` file in the root directory with your Firebase project credentials:

    ```env
    REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
    REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
    REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
    REACT_APP_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
    ```

### Running the App

1. Start the development server:
    ```sh
    yarn start
    ```

2. Open your browser and navigate to `http://localhost:3000/room/create`.
3. Save the URL of the created Room to be able to return to it.
   

## Usage

1. **Create or Join a Room**: On the main page, you can create a new room or join an existing one by entering a room ID.
2. **Select a User**: Choose your user role and name to participate in the room.
3. **Add User Stories**:If you are a spectator, you can add user stories that need to be voted on.
4. **Vote**: Cast your vote on the current user story.
5. **Track Presence**: See which users are currently active in the room.
6. **Kick User**: If you are a spectator, you can kick a user out of the room.
