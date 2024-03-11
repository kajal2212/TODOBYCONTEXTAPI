import React, { useContext } from 'react';
import { MdDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { AppContext } from '../../context/AppContextProvider';
import ReactPaginate from 'react-paginate';

function CardView() {

  const { removeTask, updateTask,displayTask,pageCount,changePage,isFirstPage,isLastPage,pagesVisited,taskPerPage } = useContext(AppContext);

  return (
    <div className='card' >
      <ul>
        { displayTask.slice(pagesVisited, pagesVisited + taskPerPage).map((listItem) => (
          <li className='cardContent' key={listItem.id}><div className='title'>Task_Description</div>
             {listItem.name}
            <FaRegEdit className='cardUpdate' onClick={() => updateTask(listItem.id)} />
            <MdDeleteSweep className='card_DelIcon' onClick={() => removeTask(listItem.id)} />
          </li>
        ))}

      </ul>
      <div className='paginationForCard'>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationContainer"}
          previousLinkClassName={"prevBtn"}
          nextLinkClassName={"nextBtn"}
          activeClassName={"active"}
          disabledClassName={"disabled"}
          previousClassName={isFirstPage ? 'hidden' : ''}
          nextClassName={isLastPage ? 'hidden' : ''}
        />
      </div>
    </div>
    
  );
}

export default CardView;

