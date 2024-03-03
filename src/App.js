import React from 'react';
import './App.css';
import InputComponent from './modules/components/InputComponent';
import ListComponent from './modules/components/ListComponent';
import AppContextProvider from './context/AppContextProvider';




function App() {

  return (
    <div className="App">
      <h1>TodoApp</h1>
      <AppContextProvider>
        <InputComponent />
        <ListComponent />
      </AppContextProvider>

    </div>
  );
}


export default App;
