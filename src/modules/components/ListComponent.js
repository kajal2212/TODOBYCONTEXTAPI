import React, { useContext } from 'react';
import { MdDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { AppContext } from '../../context/AppContextProvider';
import ReactPaginate from 'react-paginate';

function ListComponent() {
  const { removeTask, updateTask, displayTask, search, pagesVisited, taskPerPage, pageCount, changePage,
    isLastPage, isFirstPage } = useContext(AppContext);
  
    return (
   
   <div className='showList'>
      <ul>
        {displayTask.slice(pagesVisited, pagesVisited + taskPerPage).map((listItem) => (
          <li className='listContent' key={listItem.id}>
            <span className='taskContent'>{listItem.name}</span>
            <FaRegEdit className='update' onClick={() => updateTask(listItem.id)} />
            <MdDeleteSweep className='del-icon' onClick={() => removeTask(listItem.id)} />
          </li>
        ))}
        {search && displayTask.length === 0 && <p>No items found</p>}
      </ul>

      <div className='pagination'>
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

export default ListComponent;
