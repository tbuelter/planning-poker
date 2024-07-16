import { render } from '@testing-library/react';

import PlayercardList from './playercard-list';
import { User } from '../../types';

describe('PlayercardList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PlayercardList users={[]} showBackside={false} onRemoveUser={function (user: User): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
