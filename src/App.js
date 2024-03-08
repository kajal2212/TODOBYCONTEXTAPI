import React, { useContext } from 'react';
import './App.css';
import InputComponent from './modules/components/InputComponent';
import ListComponent from './modules/components/ListComponent';
import { AppContext } from './context/AppContextProvider';
import Navbar from './modules/components/Navbar';
import CardView from './modules/components/CardView';




function App() {
  const { theme, themeToggle, layout } = useContext(AppContext);
  return (
    <div className="App" id={theme} >
      <Navbar />
      <InputComponent />
      {layout ? <ListComponent /> : <CardView />}
    </div>
  );
}

export default App;
