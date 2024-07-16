import { render } from '@testing-library/react';

import CreateRoom from './create-room';

describe('CreateRoom', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateRoom onCreateRoom={function (id: string, name: string): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
