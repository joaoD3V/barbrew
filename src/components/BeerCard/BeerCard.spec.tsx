import { fireEvent, render, screen } from '@testing-library/react-native';
import { BeerCard } from '.';
import { beers } from '@/mocks/beers';
import { NavigationContainer } from '@react-navigation/native';
import { Beer } from '@/store/slices/brewery';
import logoImg from '@/assets/logo.png';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const beerWithoutImage: Beer = {
  ...beers[0],
  image_url: null,
};

describe('Component: BeerCard', () => {
  it('should be render BeerCard with correct parameters', () => {
    render(<BeerCard beer={beers[0]} />, { wrapper: NavigationContainer });

    const img = screen.getByTestId('beer-image');

    expect(img.props.accessibilityRole).toEqual('image');
    expect(img.props.source.uri).toEqual(beers[0].image_url);

    expect(screen.getByText('Buzz')).toBeTruthy();
    expect(screen.getByText('Buzz')).toBeTruthy();
  });

  it('should be render BeerCard without beer image', () => {
    render(<BeerCard beer={beerWithoutImage} />, {
      wrapper: NavigationContainer,
    });

    const img = screen.getByTestId('beer-image');

    expect(img.props.accessibilityRole).toEqual('image');
    expect(img.props.source).toEqual(logoImg);
    expect(screen.getByText('Buzz')).toBeTruthy();
    expect(screen.getByText('Buzz')).toBeTruthy();
  });

  it('should be redirect to Beer page when is pressed', () => {
    render(<BeerCard beer={beers[0]} />, { wrapper: NavigationContainer });

    const touchable = screen.getByTestId(`touchable-${beers[0].id}`);

    fireEvent.press(touchable);

    expect(mockedNavigate).toHaveBeenCalledWith('beer', { beer: beers[0] });
  });
});
