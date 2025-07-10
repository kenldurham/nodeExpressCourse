import { useEffect } from 'react';
import { AgentsContainer } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAgents } from '../../features/allAgents/allAgentsSlice';

const AllAgents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAgents());
  }, [dispatch]);

  return (
    <>
      <h2>Agent Dashboard</h2>
      <AgentsContainer />
    </>
  );
};

export default AllAgents;