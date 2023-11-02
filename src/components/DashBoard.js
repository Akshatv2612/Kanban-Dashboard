import React from 'react';
import Group from './Group';
import './DashBoard.css';

// Defining the DashBoard functional component
const DashBoard = ({users,groupedAndSortedTickets,grouping}) => {
  return (
    <div className="DashBoard">
        {/* Map over the grouped and sorted tickets and render each group */}
        {Object.entries(groupedAndSortedTickets()).map(([group, groupTicket]) => (
          <Group users={users} grouping={grouping} group={group} groupTicket={groupTicket}></Group>
        ))}
      </div>
  );
};

// Exporting the DashBoard component
export default DashBoard;
