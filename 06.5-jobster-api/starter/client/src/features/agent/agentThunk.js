import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { getAllAgents } from '../allAgents/allAgentsSlice';
import { clearValues } from './agentSlice';

export const createAgentThunk = async (agent, thunkAPI) => {
  try {
    const resp = await customFetch.post('/agents', agent);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteAgentThunk = async (agentId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/agents/${agentId}`);
    thunkAPI.dispatch(getAllAgents());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editAgentThunk = async ({ agentId, agent }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/agents/${agentId}`, agent);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

// Import these from allAgentsSlice to avoid circular dependency
const showLoading = () => ({ type: 'allAgents/showLoading' });
const hideLoading = () => ({ type: 'allAgents/hideLoading' });