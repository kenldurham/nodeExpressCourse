import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import AgentInfo from './AgentInfo';
import moment from 'moment';
import { deleteAgent, setEditAgent } from '../features/agent/agentSlice';

const Agent = ({
  _id,
  name,
  type,
  description,
  status,
  health,
  lastSeen,
  createdAt,
}) => {
  const dispatch = useDispatch();

  const date = moment(createdAt).format('MMM Do, YYYY');
  const lastSeenDate = moment(lastSeen).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{name.charAt(0)}</div>
        <div className='info'>
          <h5>{name}</h5>
          <p>{type}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <AgentInfo icon={<FaLocationArrow />} text={status} />
          <AgentInfo icon={<FaCalendarAlt />} text={date} />
          <AgentInfo icon={<FaBriefcase />} text={health} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-agent'
              className='btn edit-btn'
              onClick={() =>
                dispatch(
                  setEditAgent({
                    editAgentId: _id,
                    name,
                    type,
                    description,
                    status,
                    health,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => dispatch(deleteAgent(_id))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Agent;