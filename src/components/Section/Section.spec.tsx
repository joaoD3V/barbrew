import { render, screen } from '@testing-library/react-native';
import { Section } from '.';

describe('Component: Section', () => {
  it('should be render Section correctly', () => {
    // eslint-disable-next-line react/no-children-prop
    render(<Section title="Test" children={[]} />);

    const text = screen.getByText('Test');

    expect(text).toBeTruthy();
  });
});
