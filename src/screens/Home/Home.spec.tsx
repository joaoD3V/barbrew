import { fireEvent, render, screen } from '@/utils/customRender';
import { Home } from '.';
import { Keyboard } from 'react-native';

describe('Screen: Home', () => {
  it('should be render Home screen correctly', () => {
    render(<Home />);

    const banner = screen.getByTestId('banner');
    const flatlist = screen.getByTestId('flatlist');

    expect(banner).toBeTruthy();
    expect(flatlist).toBeTruthy();
  });

  it('shloud handles search input correctly', () => {
    render(<Home />);

    const searchInput = screen.getByPlaceholderText('Search for beer...');
    fireEvent.changeText(searchInput, 'IPA');
    expect(searchInput.props.value).toBe('IPA');
  });

  it('should executes search correctly', () => {
    jest.spyOn(Keyboard, 'dismiss');

    render(<Home />);

    const searchInput = screen.getByPlaceholderText('Search for beer...');
    const searchButton = screen.getByTestId('search-button');
    fireEvent.changeText(searchInput, 'IPA');
    fireEvent.press(searchButton);

    expect(Keyboard.dismiss).toHaveBeenCalled();
  });
});
