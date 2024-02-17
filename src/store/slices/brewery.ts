import { api } from '@/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

export type Beer = {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  ebc: number;
  srm: number;
  ph: number;
  food_pairing: string[];
  brewers_tips: string;
};

type BeerState = {
  beers: Beer[];
  currentBeerIndex: number | null;
  isLoading: boolean;
  currentPage: number;
  error: null | string;
};

const initialState: BeerState = {
  beers: [],
  currentBeerIndex: null,
  isLoading: true,
  currentPage: 1,
  error: null,
};

export const loadBeers = createAsyncThunk(
  'brewery/fetchBeers',
  async (currentPage: number) => {
    const per_page = 15;

    try {
      const response = await api.get('/beers', {
        params: { page: currentPage, per_page },
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
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadBeers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(loadBeers.fulfilled, (state, action) => {
      if (action.payload.length > 0) {
        state.beers = [...state.beers, ...action.payload];
        state.isLoading = false;
        state.currentPage += 1;
      }
    });

    builder.addCase(loadBeers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
  },
});

export const brewery = brewerySlice.reducer;
