import { configureStore } from '@reduxjs/toolkit';
import jobSlice from './features/job/jobSlice';
import userSlice from './features/user/userSlice';
import allJobsSlice from './features/allJobs/allJobsSlice';
import agentSlice from './features/agent/agentSlice';
import allAgentsSlice from './features/allAgents/allAgentsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
    agent: agentSlice,
    allAgents: allAgentsSlice,
  },
});
