import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createAgent,
  editAgent,
} from '../../features/agent/agentSlice';
import { useEffect } from 'react';

const AddAgent = () => {
  const {
    isLoading,
    name,
    type,
    description,
    typeOptions,
    status,
    statusOptions,
    health,
    healthOptions,
    isEditing,
    editAgentId,
  } = useSelector((store) => store.agent);
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !type) {
      toast.error('Please fill out all fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editAgent({
          agentId: editAgentId,
          agent: {
            name,
            type,
            description,
            status,
            health,
          },
        })
      );
      return;
    }
    dispatch(createAgent({ name, type, description, status, health }));
  };

  const handleAgentInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      // Empty for now
    }
  }, []);

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit agent' : 'add agent'}</h3>

        <div className='form-center'>
          {/* name */}
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={handleAgentInput}
          />
          {/* type */}
          <FormRowSelect
            name='type'
            labelText='agent type'
            value={type}
            handleChange={handleAgentInput}
            list={typeOptions}
          />
          {/* description */}
          <FormRow
            type='text'
            name='description'
            value={description}
            handleChange={handleAgentInput}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleAgentInput}
            list={statusOptions}
          />
          {/* health */}
          <FormRowSelect
            name='health'
            labelText='health status'
            value={health}
            handleChange={handleAgentInput}
            list={healthOptions}
          />

          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddAgent;