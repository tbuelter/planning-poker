export interface User {
    id: string;
    name: string;
    role: PlayerType;
    currentVote: number | null;
    kicked?: boolean | null
  }
  
  export interface UserStory {
    id: string;
    description: string;
    votes: Record<string, number>;
    storyPoints: number | null;
  }
  
  export interface Room {
    id: string;
    users: User[];
    userStories: UserStory[];
    currentUserStoryId?: string;
    voted: boolean;
    name?: string
  }
  
  export enum PlayerType {
    Spectator = 'spectator',
    Player = 'player'
  }