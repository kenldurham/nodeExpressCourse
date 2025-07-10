import { useEffect } from 'react';
import Agent from './Agent';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllAgents } from '../features/allAgents/allAgentsSlice';
import PageBtnContainer from './PageBtnContainer';

const AgentsContainer = () => {
  const {
    agents,
    isLoading,
    page,
    totalAgents,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allAgents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAgents());
  }, [page, search, searchStatus, searchType, sort, dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  if (agents.length === 0) {
    return (
      <Wrapper>
        <h2>No agents to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalAgents} agent{agents.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {agents.map((agent) => {
          return <Agent key={agent._id} {...agent} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default AgentsContainer;