import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllAgentsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/agents');

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};