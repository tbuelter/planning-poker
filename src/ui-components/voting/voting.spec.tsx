import { render } from '@testing-library/react';

import Voting from './voting';
import { User } from '../../types';

describe('Voting', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Voting currentUser={{} as User} voted={false} onVote={function (value: number): void {
      throw new Error('Function not implemented.');
    } } onEndVote={function (): void {
      throw new Error('Function not implemented.');
    } } onResetVote={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
