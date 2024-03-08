import React, { useContext } from 'react';
import { TfiWrite } from "react-icons/tfi";
import JsonData from "../../MockData.json";
import { AppContext } from '../../context/AppContextProvider';
import CardView from './CardView';
import ReactSwitch from 'react-switch';
import ListComponent from './ListComponent';


function Navbar() {

  const { search, setSearch, view, setCardView, cardView, handleThemeButtonClick, showReactSwitch, theme, themeToggle,
    layout, setLayout, handleViewChange } = useContext(AppContext);
  return (
    <nav>
      <ul>
        <li><span><TfiWrite /></span>TodoApp</li>
        <li><button onClick={handleThemeButtonClick}>Theme</button></li>
        {showReactSwitch && <ReactSwitch onChange={themeToggle} checked={theme === "light"} />}
        <li>
          <input
            type='search'
            placeholder='search'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button onClick={() => setSearch("")}>reset</button>
          <div className='jsonData'>
            {JsonData.filter((val) => {
              if (search === "") {
                return false;
              } else {
                return val.task_description.toLowerCase().startsWith(search.toLowerCase());
              }
            }).map((val, key) => (
              <div key={key}>{val.task_description}</div>
            ))}
          </div>
        </li>
        <li><button>filter</button></li>
        <li><select onChange={handleViewChange}>
          <option hidden>view</option>
          <option>list view</option>
          <option>card view</option>

        </select></li>



      </ul>


    </nav>



  )
}

export default Navbar;
