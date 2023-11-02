// Import necessary modules and components
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import DashBoard from './components/DashBoard';
import DisplayButton from './components/DisplayButton';
import { priorityMap } from './assets/List/priorityMap';

// Define the main App component
function App() {
  // State variables using useState
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');
  const [displayOptionsVisible, setDisplayOptionsVisible] = useState(false);

  // Fetch data from an API endpoint and set the state with fetched data
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  // Retrieve saved view state from local storage and set the state with it
  useEffect(() => {
    const savedViewState = JSON.parse(localStorage.getItem('kanbanViewState'));
    if (savedViewState) {
      setGrouping(savedViewState.grouping);
      setSorting(savedViewState.sorting);
    }
  }, []);

  // Save the current view state in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('kanbanViewState', JSON.stringify({ grouping, sorting }));
  }, [grouping, sorting]);

  // Function to group and sort tickets based on selected criteria
  const groupedAndSortedTickets = () => {
    let result = [...tickets];

    if (grouping === 'status') {
      // Group tickets by status
      result = result.reduce((grouped, ticket) => {
        const status = ticket.status;
        if (!grouped[status]) {
          grouped[status] = [];
        }
        grouped[status].push(ticket);
        return grouped;
      }, {});
    } else if (grouping === 'user') {
      // Group tickets by user
      result = result.reduce((grouped, ticket) => {
        const user = users.find((u) => u.id === ticket.userId);
        if (user) {
          if (!grouped[user.name]) {
            grouped[user.name] = [];
          }
          grouped[user.name].push(ticket);
        }
        return grouped;
      }, {});
    } else if (grouping === 'priority') {
      // Group tickets by priority
      result = result.reduce((grouped, ticket) => {
        const priority = priorityMap[ticket.priority];
        if (!grouped[priority]) {
          grouped[priority] = [];
        }
        grouped[priority].push(ticket);
        return grouped;
      }, {});
    }

    // Sort each group based on the 'sorting' criteria
    Object.keys(result).forEach((groupKey) => {
      if (sorting === 'priority') {
        result[groupKey] = result[groupKey].sort((a, b) => b.priority - a.priority);
      } else if (sorting === 'title') {
        result[groupKey] = result[groupKey].sort((a, b) => a.title.localeCompare(b.title));
      }
    });

    return result;
  };

  // Ref for the display options button
  const displayOptionsRef = useRef(null);

  // Toggle the visibility of display options
  const handleDisplayClick = () => {
    setDisplayOptionsVisible(!displayOptionsVisible);
  };

  // Listen for clicks outside the display options and close it if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (displayOptionsRef.current && !displayOptionsRef.current.contains(event.target)) {
        setDisplayOptionsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Render the main component
  return (
    <div className="app">
      <DisplayButton
        grouping={grouping}
        sorting={sorting}
        setGrouping={setGrouping}
        setSorting={setSorting}
        handleDisplayClick={handleDisplayClick}
        displayOptionsVisible={displayOptionsVisible}
        displayOptionsRef={displayOptionsRef}
      ></DisplayButton>
      <DashBoard
        users={users}
        grouping={grouping}
        groupedAndSortedTickets={groupedAndSortedTickets}
        priorityMap={priorityMap}
      ></DashBoard>
    </div>
  );
}

// Export the App component
export default App;
