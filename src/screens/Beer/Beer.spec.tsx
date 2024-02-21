import { fireEvent, render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Beer } from '.';
import { beers } from '@/mocks/beers';
import logoImg from '@/assets/logo.png';

const mockedNavigate = jest.fn();
let mockedParams = {
  beer: beers[0],
};

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useRoute: () => ({
      params: mockedParams,
    }),
  };
});

describe('Screen: Beer', () => {
  it('should be render Beer Screen with correct parameters', () => {
    render(<Beer />, { wrapper: NavigationContainer });

    expect(screen.getByText('Buzz')).toBeTruthy();
    expect(screen.getByText(/A light, crisp and bitter IPA/i)).toBeTruthy();
  });

  it('should be go back when touchable is press', async () => {
    render(<Beer />, { wrapper: NavigationContainer });

    fireEvent.press(screen.getByTestId('go-back'));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  it('should be show default image when not exists url', async () => {
    mockedParams = { beer: { ...beers[0], image_url: null } };

    render(<Beer />, { wrapper: NavigationContainer });

    const img = screen.getByTestId('beer-image');

    expect(img.props.source).toEqual(logoImg);
  });
});
