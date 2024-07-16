import { render } from '@testing-library/react';

import Story from './story';
import { PlayerType } from '../../types';

describe('Story', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Story userRole={PlayerType.Spectator} onRemoveStory={function (storyId: string): void {
      throw new Error('Function not implemented.');
    } } onSetEstimateStory={function (estimate: number): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
