import { render, screen } from '@testing-library/react-native';
import { LoadingList } from '.';

describe('Component: Loading List', () => {
  it('should be render Loading List correctly', () => {
    render(<LoadingList />);

    const loading = screen.getByAccessibilityHint('loading');

    expect(loading).toBeTruthy();
  });
});
