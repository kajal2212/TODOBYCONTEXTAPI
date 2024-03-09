import React, { useContext } from 'react';
import { MdDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { AppContext } from '../../context/AppContextProvider';

function CardView() {

  const { todoList, removeTask, updateTask } = useContext(AppContext);

  return (
    <div className='card' >
      <ul>
        {todoList.map((listItem) => (
          <li className='cardContent' key={listItem.id}><div className='title'>Task_Description</div>
             {listItem.name}
            <FaRegEdit className='cardUpdate' onClick={() => updateTask(listItem.id)} />
            <MdDeleteSweep className='card_DelIcon' onClick={() => removeTask(listItem.id)} />
          </li>
        ))}

      </ul>
    </div>
    
  );
}

export default CardView;

