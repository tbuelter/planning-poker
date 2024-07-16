import { render } from '@testing-library/react';

import Playercard from './playercard';
import { User } from '../../types';

describe('Playercard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Playercard user={{} as User} rank={null} suit={'hearts'} showBackside={false} onRemoveUser={function (user: User): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
