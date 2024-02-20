import { api } from '@/lib/axios';
import { Beer, BeerState, PER_PAGE, loadBeers, searchBeers } from './brewery';
import { brewery as reducer, resetFilteredBeersList } from './brewery';

const beers: Beer[] = [
  {
    id: 1,
    name: 'Buzz',
    tagline: 'A Real Bitter Experience.',
    first_brewed: '09/2007',
    description:
      'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
    image_url: 'https://images.punkapi.com/v2/keg.png',
    abv: 4.5,
    ibu: 60,
    ebc: 20,
    srm: 10,
    ph: 4.4,
    food_pairing: [
      'Spicy chicken tikka masala',
      'Grilled chicken quesadilla',
      'Caramel toffee cake',
    ],
    brewers_tips:
      'The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.',
  },
  {
    id: 2,
    name: 'Trashy Blonde',
    tagline: "You Know You Shouldn't",
    first_brewed: '04/2008',
    description:
      'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.',
    image_url: 'https://images.punkapi.com/v2/2.png',
    abv: 4.1,
    ibu: 41.5,
    ebc: 15,
    srm: 15,
    ph: 4.4,
    food_pairing: [
      'Fresh crab with lemon',
      'Garlic butter dipping sauce',
      'Goats cheese salad',
      'Creamy lemon bar doused in powdered sugar',
    ],
    brewers_tips:
      'Be careful not to collect too much wort from the mash. Once the sugars are all washed out there are some very unpleasant grainy tasting compounds that can be extracted into the wort.',
  },
  {
    id: 3,
    name: 'Berliner Weisse With Yuzu - B-Sides',
    tagline: 'Japanese Citrus Berliner Weisse.',
    first_brewed: '11/2015',
    description:
      'Japanese citrus fruit intensifies the sour nature of this German classic.',
    image_url: 'https://images.punkapi.com/v2/keg.png',
    abv: 4.2,
    ibu: 8,
    ebc: 8,
    srm: 4,
    ph: 3.2,
    food_pairing: ['Smoked chicken wings', 'Miso ramen', 'Yuzu cheesecake'],
    brewers_tips:
      'Clean everything twice. All you want is the clean sourness of lactobacillus.',
  },
  {
    id: 4,
    name: 'Pilsen Lager',
    tagline: 'Unleash the Yeast Series.',
    first_brewed: '09/2013',
    description:
      'Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness. Everything else is down to the yeast. Pilsner yeast ferments with no fruity esters or spicy phenols, although it can add a hint of butterscotch.',
    image_url: 'https://images.punkapi.com/v2/4.png',
    abv: 6.3,
    ibu: 55,
    ebc: 30,
    srm: 15,
    ph: 4.4,
    food_pairing: [
      'Spicy crab cakes',
      'Spicy cucumber and carrot Thai salad',
      'Sweet filled dumplings',
    ],
    brewers_tips:
      'Play around with the fermentation temperature to get the best flavour profile from the individual yeasts.',
  },
];

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

jest.mock('@/lib/axios', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('thunks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should loadBeers calls correctly', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ brewery: { currentPageBeers: 1 } }));

    const responseData = [
      { id: 1, name: 'Beer 1' },
      { id: 2, name: 'Beer 2' },
    ];
    (api.get as jest.Mock).mockResolvedValue({ data: responseData });

    await loadBeers()(dispatch, getState, undefined);

    expect(api.get).toHaveBeenCalledWith('/beers', {
      params: { page: 1, per_page: PER_PAGE },
    });
  });

  it('should searchBeers calls correctly', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      brewery: { currentPageFilteredBeers: 1 },
    }));
    const beerName = 'IPA';

    const responseData = [
      { id: 1, name: 'IPA Beer 1' },
      { id: 2, name: 'IPA Beer 2' },
    ];
    (api.get as jest.Mock).mockResolvedValue({ data: responseData });

    await searchBeers(beerName)(dispatch, getState, undefined);

    expect(api.get).toHaveBeenCalledWith('/beers', {
      params: { beer_name: beerName, page: 1, per_page: PER_PAGE },
    });
  });
});
