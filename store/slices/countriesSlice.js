import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk('countries/fetch', async () => {
  const { data } = await axios.get(
    'https://restcountries.com/v2/all?fields=name,region,flag'
  );
  return data;
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    all: [],
    status: 'idle',
    error: null,
    regionFilter: 'All',
    page: 1,
    perPage: 12
  },
  reducers: {
    setFilter(state, action) {
      state.regionFilter = action.payload;
      state.page = 1;
    },
    loadNextPage(state) {
      state.page += 1;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCountries.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.all = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setFilter, loadNextPage } = countriesSlice.actions;
export default countriesSlice.reducer;