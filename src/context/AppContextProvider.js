import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [addTask, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [editTask, setEditTask] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(addTask); 
    setTask("");
  };


  const addTodo = (newTodoList) => {
    if (!newTodoList) {

      alert("please fill the task");

    }
    else if (newTodoList && !toggle) {
      
      setTodoList(
        todoList.map((listItem) => {
          if (listItem.id === editTask) {
            return { ...listItem, name: newTodoList }
          }
          return listItem;
        }
        )
      )
      setToggle(true);

    }
    else {
      const allNewTodoList = { id: new Date().getTime().toString(), name: newTodoList }
      setTodoList([...todoList, allNewTodoList]);
    }
  };

  const removeTask = (index) => {
    const newList = todoList.filter((listItem) => { return index !== listItem.id });
    setTodoList(newList);
  };

  const updateTask = (id) => {
    let newUpdatedTask = todoList.find((listItem) => {
      return listItem.id === id
    });
    setToggle(false);
    setTask(newUpdatedTask.name);
    setEditTask(id);

  }



  const contextValue = {
    addTask,
    todoList,
    setTodoList,
    addTodo,
    setTask,
    removeTask,
    updateTask,
    toggle,
    setToggle,
    editTask,
    setEditTask,
    handleSubmit

  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
