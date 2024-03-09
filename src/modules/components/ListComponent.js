import React, { useContext } from 'react';
import { MdDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { AppContext } from '../../context/AppContextProvider';

function ListComponent() {

  const { todoList, removeTask, updateTask, displayTask, search } = useContext(AppContext);

  return (
    <div className='showList' >
      <ul>

        {displayTask.map((listItem) => (
          <li className='listContent' key={listItem.id}>
            {listItem.name}
            <MdDeleteSweep className='del-icon' onClick={() => removeTask(listItem.id)} />
            <FaRegEdit className='update' onClick={() => updateTask(listItem.id)} />
          </li>
        ))}
        {search && displayTask.length === 0 && <p>No items found</p>}
      </ul>
    </div>
  );
}

export default ListComponent;
