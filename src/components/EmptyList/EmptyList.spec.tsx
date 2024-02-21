import { render, screen } from '@testing-library/react-native';
import { EmptyList } from '.';
import logoImg from '@/assets/logo.png';

describe('Component: EmptyList', () => {
  it('should be render EmptyList correctly', () => {
    render(<EmptyList />);

    const img = screen.getByTestId('logo');
    const text = screen.getByText(/sorry.../i);

    expect(img.props.source).toEqual(logoImg);
    expect(text).toBeTruthy();
  });
});
