import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [addTask, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [editTask, setEditTask] = useState(null);
  const [theme, setTheme] = useState("light");
  const [search, setSearch] = useState('');
  const [showReactSwitch, setShowReactSwitch] = useState(false);
  const [layout, setLayout] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [taskPerPage, setTaskPerPage] = useState(8);
  const [displayTask, setDisplayTask] = useState([]);

  // localStorage
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
  
  // addTask
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

  // removeTask
  const removeTask = (id) => {
    try {
      const newList = todoList.filter((listItem) => listItem.id !== id);
      setTodoList(newList);
    } catch (error) {
      console.error('Error removing todo item:', error);
    }
  };
 
  // updateTask
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

  // themeToggle
  const themeToggle = () => {
    try {
      setTheme((current) => (current === "light" ? "dark" : "light"));
    } catch (error) {
      console.error('error in toggling:', error);
    }
  };

  const handleThemeButtonClick = () => {
    setShowReactSwitch(prevState => !prevState);
  };

  // viewChange
  const handleViewChange = (e) => {
    const selectedView = e.target.value;
    if (selectedView === 'list view') {
      setLayout(true);
    } else if (selectedView === 'card view') {
      setLayout(false);
    }
  };
  
  // search
  const searchTask = (searchValue) => {
    console.log("Search Value:", searchValue);
    setSearch(searchValue);
    if (searchValue === '') {
      setFilteredResults(todoList);
    } else {
      const filtered = todoList.filter((listItem) =>
        listItem.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log("Filtered Results:", filtered);
      setFilteredResults(filtered);
    }
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    console.log("Handling Change - Search Value:", searchValue)
    searchTask(searchValue);
  };

  useEffect(() => {
    const updatedDisplayTask = search ? filteredResults : todoList;
    setDisplayTask(updatedDisplayTask);
  }, [search, filteredResults, todoList]);

  // pagination
  const pagesVisited = pageNo * taskPerPage;
  const pageCount = Math.ceil(displayTask.length / taskPerPage);
  const changePage = ({ selected }) => {
    setPageNo(selected);
  }

  useEffect(() => {
    setPage(displayTask);
  }, [displayTask]);

  const isFirstPage = pagesVisited === 0;
  const isLastPage = pagesVisited + taskPerPage >= displayTask.length;

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
    theme,
    setTheme,
    themeToggle,
    search,
    setSearch,
    showReactSwitch,
    setShowReactSwitch,
    handleThemeButtonClick,
    layout,
    setLayout,
    handleViewChange,
    filteredResults,
    setFilteredResults,
    searchTask,
    searchValue,
    setSearchValue,
    displayTask,
    setDisplayTask,
    handleSearchChange,
    page,
    setPage,
    pageNo,
    setPageNo,
    pagesVisited,
    pageCount,
    changePage, taskPerPage,
    setTaskPerPage,
    isFirstPage, isLastPage,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
