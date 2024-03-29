import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContextProvider';

function InputComponent() {
  
  const { addTask, setTask, handleSubmit,toggle} = useContext(AppContext);

 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='inputItems'>
          <label>Task</label>
          <input type="text" value={addTask} onChange={(e) => setTask(e.target.value)} placeholder='add any task'/> 
          {
            toggle ? "" : <button onClick={handleSubmit} className='updateButton'>update</button>  
          }
          <hr></hr>
        </div>
      </form>
    </div>
     
  );
}

export default InputComponent;
