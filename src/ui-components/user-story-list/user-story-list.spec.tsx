import { render } from '@testing-library/react';

import UserStoryList from './user-story-list';
import { PlayerType, UserStory } from '../../types';

describe('UserStoryList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserStoryList userStories={[]} userRole={PlayerType.Spectator} onAddStory={function (story: UserStory): void {
      throw new Error('Function not implemented.');
    } } onRemoveStory={function (storyId: string): void {
      throw new Error('Function not implemented.');
    } } onVoteStory={function (storyId: string): void {
      throw new Error('Function not implemented.');
    } } onSetEstimateStory={function (estimate: number): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
