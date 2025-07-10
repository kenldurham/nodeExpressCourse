import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createAgentThunk, deleteAgentThunk, editAgentThunk } from './agentThunk';

const initialState = {
  isLoading: false,
  name: '',
  type: 'GitHub Copilot Agent',
  description: '',
  typeOptions: [
    'GitHub Copilot Agent',
    'Data Processing Agent',
    'API Monitor Agent',
    'Automation Agent',
    'ML Model Agent',
    'Custom Agent'
  ],
  statusOptions: ['running', 'stopped', 'error', 'pending'],
  status: 'pending',
  healthOptions: ['healthy', 'warning', 'critical'],
  health: 'healthy',
  isEditing: false,
  editAgentId: '',
};

export const createAgent = createAsyncThunk('agent/createAgent', createAgentThunk);

export const deleteAgent = createAsyncThunk('agent/deleteAgent', deleteAgentThunk);

export const editAgent = createAsyncThunk('agent/editAgent', editAgentThunk);

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
    setEditAgent: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    [createAgent.pending]: (state) => {
      state.isLoading = true;
    },
    [createAgent.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Agent Created');
    },
    [createAgent.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteAgent.fulfilled]: (state, { payload }) => {
      toast.success(payload);
    },
    [deleteAgent.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [editAgent.pending]: (state) => {
      state.isLoading = true;
    },
    [editAgent.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Agent Modified...');
    },
    [editAgent.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues, setEditAgent } = agentSlice.actions;

export default agentSlice.reducer;