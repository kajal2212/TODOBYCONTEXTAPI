import React, { useContext } from 'react';
import { MdDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { AppContext } from '../../context/AppContextProvider';

function ListComponent() {

  const { todoList, removeTask, updateTask } = useContext(AppContext);

  return (
    <div className='showList' >
      <ul>
        {todoList.map((listItem) => (
          <li className='listContent' key={listItem.id}>
            {listItem.name}
            <MdDeleteSweep className='del-icon' onClick={() => removeTask(listItem.id)} />
            <FaRegEdit className='update' onClick={() => updateTask(listItem.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListComponent;
