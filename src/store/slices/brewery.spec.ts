import { api } from '@/libs/axios';
import { BeerState, PER_PAGE, loadBeers, searchBeers } from './brewery';
import { brewery as reducer, resetFilteredBeersList } from './brewery';
import { beers } from '@/mocks/beers';
import { Alert } from 'react-native';

const exampleFilteredBeers: BeerState = {
  beers: beers,
  filteredBeers: beers.slice(0, 2),
  isLoading: true,
  currentPageBeers: 1,
  currentPageFilteredBeers: 1,
  endLoad: false,
};

const loadBeerPending: BeerState = {
  beers: beers.slice(0, 2),
  filteredBeers: [],
  isLoading: false,
  currentPageBeers: 1,
  currentPageFilteredBeers: 1,
  endLoad: false,
};

const loadBeerFullfiled: BeerState = {
  beers: beers.slice(0, 2),
  filteredBeers: [],
  isLoading: true,
  currentPageBeers: 1,
  currentPageFilteredBeers: 1,
  endLoad: false,
};

const filteredBeersFullfiled: BeerState = {
  beers,
  filteredBeers: beers.slice(0, 2),
  isLoading: true,
  currentPageBeers: 1,
  currentPageFilteredBeers: 1,
  endLoad: false,
};

describe('brewery slice', () => {
  it('should be able to reset filtered beers list', () => {
    const state = reducer(exampleFilteredBeers, resetFilteredBeersList());

    expect(state.filteredBeers).toHaveLength(0);
    expect(state.currentPageFilteredBeers).toEqual(1);
    expect(state.endLoad).toBeFalsy();
  });

  it('should be able to handle loading and error when loadBeer is pending', () => {
    const action = {
      type: loadBeers.pending.type,
      payload: [],
    };

    const { isLoading, currentPageBeers, endLoad, beers } = reducer(
      loadBeerPending,
      action
    );

    expect(isLoading).toBeTruthy();
    expect(currentPageBeers).toBe(loadBeerPending.currentPageBeers);
    expect(endLoad).toBeFalsy();
    expect(beers).toHaveLength(2);
  });

  it('should be able to handle loadBeer when payload size more than 0', () => {
    const action = {
      type: loadBeers.fulfilled.type,
      payload: [
        { id: 1, name: 'Beer 1' },
        { id: 2, name: 'Beer 2' },
      ],
    };

    const { isLoading, currentPageBeers, endLoad, beers } = reducer(
      loadBeerFullfiled,
      action
    );

    expect(isLoading).toBeFalsy();
    expect(currentPageBeers).toBe(loadBeerFullfiled.currentPageBeers + 1);
    expect(endLoad).toBeFalsy();
    expect(beers).toHaveLength(4);
  });

  it('should be able to handle loadBeer when payload size equals to 0', () => {
    const action = {
      type: loadBeers.fulfilled.type,
      payload: [],
    };

    const { isLoading, currentPageBeers, endLoad, beers } = reducer(
      loadBeerFullfiled,
      action
    );

    expect(isLoading).toBeFalsy();
    expect(currentPageBeers).toBe(loadBeerFullfiled.currentPageBeers);
    expect(endLoad).toBeTruthy();
    expect(beers).toHaveLength(2);
  });

  it('should be able to handle loadBeer when loadBeer is rejected', () => {
    const action = {
      type: loadBeers.rejected.type,
      payload: [],
    };

    const { isLoading, currentPageBeers, endLoad, beers } = reducer(
      loadBeerFullfiled,
      action
    );

    expect(isLoading).toBeFalsy();
    expect(currentPageBeers).toBe(loadBeerFullfiled.currentPageBeers);
    expect(endLoad).toBeFalsy();
    expect(beers).toHaveLength(2);
  });

  it('should be able to handle loading and error when searchBeers is pending', () => {
    const action = {
      type: searchBeers.pending.type,
      payload: [],
    };

    const { isLoading, currentPageFilteredBeers, endLoad, filteredBeers } =
      reducer(loadBeerPending, action);

    expect(isLoading).toBeTruthy();
    expect(currentPageFilteredBeers).toBe(
      loadBeerPending.currentPageFilteredBeers
    );
    expect(endLoad).toBeFalsy();
    expect(filteredBeers).toHaveLength(0);
  });

  it('should be able to handle searchBeers when payload size more than 0 and less than 20', () => {
    const action = {
      type: searchBeers.fulfilled.type,
      payload: [
        { id: 1, name: 'Beer 1' },
        { id: 2, name: 'Beer 2' },
      ],
    };

    const { isLoading, currentPageFilteredBeers, endLoad, filteredBeers } =
      reducer(filteredBeersFullfiled, action);

    expect(isLoading).toBeFalsy();
    expect(currentPageFilteredBeers).toBe(
      loadBeerFullfiled.currentPageFilteredBeers + 1
    );
    expect(endLoad).toBeTruthy();
    expect(filteredBeers).toHaveLength(4);
  });

  it('should be able to handle searchBeers when payload size more than 0 and equals 20', () => {
    const payload = Array(20)
      .fill(0)
      .map((_, index) => ({ id: index + 1, name: `Beer ${index + 1}` }));

    const action = {
      type: searchBeers.fulfilled.type,
      payload,
    };

    const { isLoading, currentPageFilteredBeers, endLoad, filteredBeers } =
      reducer(filteredBeersFullfiled, action);

    expect(isLoading).toBeFalsy();
    expect(currentPageFilteredBeers).toBe(
      loadBeerFullfiled.currentPageFilteredBeers + 1
    );
    expect(endLoad).toBeFalsy();
    expect(filteredBeers).toHaveLength(22);
  });

  it('should be able to handle searchBeers when payload size equals to 0', () => {
    const action = {
      type: searchBeers.fulfilled.type,
      payload: [],
    };

    const { isLoading, currentPageFilteredBeers, endLoad, filteredBeers } =
      reducer(filteredBeersFullfiled, action);

    expect(isLoading).toBeFalsy();
    expect(currentPageFilteredBeers).toBe(
      loadBeerFullfiled.currentPageFilteredBeers
    );
    expect(endLoad).toBeTruthy();
    expect(filteredBeers).toHaveLength(0);
  });

  it('should be able to handle searchBeers when loadBeer is rejected', () => {
    const action = {
      type: searchBeers.rejected.type,
      payload: [],
    };

    const { isLoading, currentPageFilteredBeers, endLoad, filteredBeers } =
      reducer(filteredBeersFullfiled, action);

    expect(isLoading).toBeFalsy();
    expect(currentPageFilteredBeers).toBe(
      loadBeerFullfiled.currentPageFilteredBeers
    );
    expect(endLoad).toBeFalsy();
    expect(filteredBeers).toHaveLength(2);
  });
});

describe('thunks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should loadBeers calls correctly', async () => {
    const responseData = [
      { id: 1, name: 'Beer 1' },
      { id: 2, name: 'Beer 2' },
    ];

    jest.spyOn(api, 'get').mockResolvedValue({ data: responseData });

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ brewery: { currentPageBeers: 1 } }));

    await loadBeers()(dispatch, getState, undefined);

    expect(api.get).toHaveBeenCalledWith('/beers', {
      params: { page: 1, per_page: PER_PAGE },
    });
  });

  it('should handle loadBeers errors', async () => {
    jest.spyOn(api, 'get').mockRejectedValue({ data: [] });
    jest.spyOn(Alert, 'alert');

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ brewery: { currentPageBeers: 1 } }));

    await loadBeers()(dispatch, getState, undefined);

    expect(Alert.alert).toHaveBeenCalledTimes(1);
  });

  it('should searchBeers calls correctly', async () => {
    const responseData = [
      { id: 1, name: 'IPA Beer 1' },
      { id: 2, name: 'IPA Beer 2' },
    ];

    jest.spyOn(api, 'get').mockResolvedValue({ data: responseData });

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      brewery: { currentPageFilteredBeers: 1 },
    }));
    const beerName = 'IPA';

    await searchBeers(beerName)(dispatch, getState, undefined);

    expect(api.get).toHaveBeenCalledWith('/beers', {
      params: { beer_name: beerName, page: 1, per_page: PER_PAGE },
    });
  });

  it('should handle searchBeers errors', async () => {
    jest.spyOn(api, 'get').mockRejectedValue({ data: [] });
    jest.spyOn(Alert, 'alert');

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      brewery: { currentPageFilteredBeers: 1 },
    }));
    const beerName = 'IPA';

    await searchBeers(beerName)(dispatch, getState, undefined);

    expect(Alert.alert).toHaveBeenCalledTimes(1);
  });
});
