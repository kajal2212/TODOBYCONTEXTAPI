import React, { useContext } from 'react';
import './App.css';
import InputComponent from './modules/components/InputComponent';
import ListComponent from './modules/components/ListComponent';
import { AppContext } from './context/AppContextProvider';
import ReactSwitch from 'react-switch';

function App() {
  const { theme, themeToggle } = useContext(AppContext);
  return (
    <div className="App" id={theme} >
      <h1>TodoApp</h1>
      <div className="switch">
        <ReactSwitch onChange={themeToggle} checked={theme === "light"} />
      </div>
      <InputComponent />
      <ListComponent />
    </div>
  );
}

export default App;
