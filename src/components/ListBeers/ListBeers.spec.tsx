import { fireEvent, render, screen } from '@testing-library/react-native';
import { ListBeers } from '.';
import { beers } from '@/mocks/beers';
import { NavigationContainer } from '@react-navigation/native';
import logoImg from '@/assets/logo.png';
import { Beer } from '@/store/slices/brewery';

describe('Component: ListBeers', () => {
  it('should be render List Beers correctly', () => {
    const endLoad = false;
    const isLoading = false;

    const onLoad = jest.fn();

    render(
      <ListBeers
        items={beers.slice(0, 19)}
        endLoad={endLoad}
        isLoading={isLoading}
        onLoad={onLoad}
      />,
      { wrapper: NavigationContainer }
    );

    const flatList = screen.getByTestId('flatlist');

    expect(flatList).toBeTruthy();
  });

  it('should be call onLoad when distance from end greather than 0', () => {
    const endLoad = false;
    const isLoading = false;

    const onLoad = jest.fn();

    render(
      <ListBeers
        items={beers.slice(0, 19)}
        endLoad={endLoad}
        isLoading={isLoading}
        onLoad={onLoad}
      />,
      { wrapper: NavigationContainer }
    );

    const flatList = screen.getByTestId('flatlist');

    fireEvent(flatList, 'onEndReached', { distanceFromEnd: 1 });

    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('should not be call onLoad when distance from end equals 0', () => {
    const endLoad = false;
    const isLoading = false;

    const onLoad = jest.fn();

    render(
      <ListBeers
        items={beers.slice(0, 19)}
        endLoad={endLoad}
        isLoading={isLoading}
        onLoad={onLoad}
      />,
      { wrapper: NavigationContainer }
    );

    const flatList = screen.getByTestId('flatlist');

    fireEvent(flatList, 'onEndReached', { distanceFromEnd: 0 });

    expect(onLoad).toHaveBeenCalledTimes(0);
  });

  it('should show loads on inital load list', () => {
    const endLoad = false;
    const isLoading = true;

    const onLoad = jest.fn();

    render(
      <ListBeers
        items={[]}
        endLoad={endLoad}
        isLoading={isLoading}
        onLoad={onLoad}
      />,
      { wrapper: NavigationContainer }
    );

    const loading = screen.getByAccessibilityHint('loading');

    expect(loading).toBeTruthy();
  });

  it('should indicate empty list if not inital load list', () => {
    const endLoad = false;
    const isLoading = false;

    const onLoad = jest.fn();

    render(
      <ListBeers
        items={[]}
        endLoad={endLoad}
        isLoading={isLoading}
        onLoad={onLoad}
      />,
      { wrapper: NavigationContainer }
    );

    const img = screen.getByTestId('logo');
    const text = screen.getByText(/sorry.../i);

    expect(img.props.source).toEqual(logoImg);
    expect(text).toBeTruthy();
  });

  it('should indicate loading when not end load and items is more than 20', () => {
    const endLoad = false;
    const isLoading = false;

    const onLoad = jest.fn();

    const moreThanTwentyBeers: Beer[] = Array(21)
      .fill(0)
      .map((beer, index) => ({ id: index + 1, ...beer }));

    render(
      <ListBeers
        items={moreThanTwentyBeers}
        endLoad={endLoad}
        isLoading={isLoading}
        onLoad={onLoad}
      />,
      { wrapper: NavigationContainer }
    );

    const loading = screen.getByAccessibilityHint('loading');

    expect(loading).toBeTruthy();
  });

  it('should not indicate loading when end load and items is equals or less than 20', () => {
    const endLoad = true;
    const isLoading = false;

    const onLoad = jest.fn();

    render(
      <ListBeers
        items={beers}
        endLoad={endLoad}
        isLoading={isLoading}
        onLoad={onLoad}
      />,
      { wrapper: NavigationContainer }
    );

    const loading = screen.queryByAccessibilityHint('loading');

    expect(loading).toBeFalsy();
  });
});
