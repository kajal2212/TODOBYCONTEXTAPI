import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [addTask, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [editTask, setEditTask] = useState(null);

  const getLocalItems = () => {
    try {
      const storedItems = localStorage.getItem('listOfTask');
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
      return [];
    }
  };

  useEffect(() => {
    try {
      const localItems = getLocalItems();
      setTodoList(prevTodoList => [...prevTodoList, ...localItems]);
      console.log('Todo list after setting from local storage:', localItems);
    } catch (error) {
      console.error('Error setting todo list from local storage:', error);
    }
  }, []);
  

  useEffect(() => {
    try {
      localStorage.setItem('listOfTask', JSON.stringify(todoList));
    } catch (error) {
      console.error('Error storing todo list in local storage:', error);
    }
  }, [todoList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(addTask);
    setTask('');
  };

  const addTodo = (newTodoList) => {
    try {
      if (!newTodoList) {
        alert('Please fill the task');
      } else if (newTodoList && !toggle) {
        setTodoList((prevTodoList) =>
          prevTodoList.map((listItem) => {
            if (listItem.id === editTask) {
              return { ...listItem, name: newTodoList };
            }
            return listItem;
          })
        );
        setToggle(true);
      } else {
        const allNewTodoList = { id: new Date().getTime().toString(), name: newTodoList };
        setTodoList((prevTodoList) => [...prevTodoList, allNewTodoList]);
      }
    } catch (error) {
      console.error('Error adding todo item:', error);
    }
  };

  const removeTask = (id) => {
    try {
      const newList = todoList.filter((listItem) => listItem.id !== id);
      setTodoList(newList);
    } catch (error) {
      console.error('Error removing todo item:', error);
    }
  };

  const updateTask = (id) => {
    try {
      let newUpdatedTask = todoList.find((listItem) => listItem.id === id);
      setToggle(false);
      setTask(newUpdatedTask.name);
      setEditTask(id);
    } catch (error) {
      console.error('Error updating todo item:', error);
    }
  };

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
    handleSubmit,
    getLocalItems,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
