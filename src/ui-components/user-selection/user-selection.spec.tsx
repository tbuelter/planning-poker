import { render } from '@testing-library/react';

import UserSelection from './user-selection';
import { User } from '../../types';

describe('UserSelection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserSelection onUserSelect={function (user: User): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
