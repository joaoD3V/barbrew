import { api } from '@/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Alert } from 'react-native';

export const PER_PAGE = 20;

export type Beer = {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string | null;
  abv: number;
  ibu: number;
  ebc: number;
  srm: number;
  ph: number;
  food_pairing: string[];
  brewers_tips: string;
};

export type BeerState = {
  beers: Beer[];
  filteredBeers: Beer[];
  currentBeerIndex: number | null;
  isLoading: boolean;
  currentPageBeers: number;
  currentPageFilteredBeers: number;
  endLoad: boolean;
};

const initialState: BeerState = {
  beers: [],
  filteredBeers: [],
  currentBeerIndex: null,
  isLoading: true,
  currentPageBeers: 1,
  currentPageFilteredBeers: 1,
  endLoad: false,
};

export const loadBeers = createAsyncThunk(
  'brewery/fetchBeers',
  async (_, { getState }) => {
    const { currentPageBeers } = (getState() as RootState).brewery;

    try {
      const response = await api.get('/beers', {
        params: { page: currentPageBeers, per_page: PER_PAGE },
      });

      return response.data;
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar a lista.');
    }
  }
);

export const searchBeers = createAsyncThunk(
  'brewery/searchBeers',
  async (beerName: string, { getState }) => {
    const { currentPageFilteredBeers } = (getState() as RootState).brewery;

    try {
      const response = await api.get('/beers', {
        params: {
          beer_name: beerName,
          page: currentPageFilteredBeers,
          per_page: PER_PAGE,
        },
      });

      return response.data;
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar a lista.');
    }
  }
);

export const brewerySlice = createSlice({
  name: 'brewery',
  initialState,
  reducers: {
    resetFilteredBeersList: (state) => {
      state.filteredBeers = [];
      state.currentPageFilteredBeers = 1;
    },
  },
  extraReducers(builder) {
    // loadBeers
    builder.addCase(loadBeers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadBeers.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload.length > 0) {
        state.currentPageBeers += 1;
        state.endLoad = false;
        state.beers = [...state.beers, ...action.payload];
      } else {
        state.endLoad = true;
      }
    });

    builder.addCase(loadBeers.rejected, (state) => {
      state.isLoading = false;
    });

    // searchBeers
    builder.addCase(searchBeers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(searchBeers.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload.length > 0) {
        state.currentPageFilteredBeers += 1;
        state.endLoad = action.payload.length < 20;
        state.filteredBeers = [...state.filteredBeers, ...action.payload];
      } else {
        state.endLoad = true;
        state.filteredBeers = action.payload;
      }
    });

    builder.addCase(searchBeers.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const brewery = brewerySlice.reducer;

export const { resetFilteredBeersList } = brewerySlice.actions;
