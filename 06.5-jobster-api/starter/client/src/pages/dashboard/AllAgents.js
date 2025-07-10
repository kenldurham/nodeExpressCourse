import { useEffect } from 'react';
import { AgentsContainer, SearchContainer } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAgents } from '../../features/allAgents/allAgentsSlice';

const AllAgents = () => {
  const {
    isLoading,
    agents,
    totalAgents,
    numOfPages,
    page,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allAgents);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAgents());
  }, [dispatch]);

  return (
    <>
      <SearchContainer />
      <AgentsContainer />
    </>
  );
};

export default AllAgents;