import { render, screen } from '@testing-library/react-native';
import { Loading } from '.';

describe('Component: Loading', () => {
  it('should be render Loading correctly', () => {
    render(<Loading />);

    const loading = screen.getByAccessibilityHint('loading');

    expect(loading).toBeTruthy();
  });
});
