import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllAgentsThunk } from './allAgentsThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  agents: [],
  totalAgents: 0,
  numOfPages: 1,
  page: 1,
  ...initialFiltersState,
};

export const getAllAgents = createAsyncThunk('allAgents/getAgents', getAllAgentsThunk);

const allAgentsSlice = createSlice({
  name: 'allAgents',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllAgentsState: (state) => initialState,
  },
  extraReducers: {
    [getAllAgents.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllAgents.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.agents = payload.agents;
      state.totalAgents = payload.count;
    },
    [getAllAgents.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllAgentsState,
} = allAgentsSlice.actions;

export default allAgentsSlice.reducer;