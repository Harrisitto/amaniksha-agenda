import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const allPages = [
  'Home',
  'Form'
] as const;

type Pages = typeof allPages[number];

type NavigatePayload = {
  mainPage: Pages;
  searchParams?: SearchParams;
}
interface SearchParams {
  id: number;
}

interface NavigationSlice {
  mainPage : Pages;
  searchParams: SearchParams;
}

const initialState: NavigationSlice = {
  mainPage: 'Home',
  searchParams: {
    id: 0,
  }
};

const navigationSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    navigateTo(state, action: PayloadAction<NavigatePayload>) {
      state.mainPage = action.payload.mainPage;
      if (action.payload.searchParams) state.searchParams = action.payload.searchParams;
    }
  },
});

export const { navigateTo } = navigationSlice.actions;
export default navigationSlice.reducer;
