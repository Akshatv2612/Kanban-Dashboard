import React from 'react';
import Ticket from './Tickets.js';
import './Group.css';
import Icon from './Icon.js';
import UserIcon from './UserIcon.js';

// Define the Group functional component
const Group = ({ users, group, groupTicket, grouping, priorityMap }) => {
  let groupIcon = null;

  // Determine the group icon based on the grouping criteria
  if (grouping === 'user') {
    // Function to find a user by their name
    const findUserByName = (userName) => {
      return users.find((user) => user.name === userName);
    };

    // Find the user by the group name
    let user = findUserByName(group);

    // Set the group icon to a UserIcon with user details
    groupIcon = <UserIcon name={group} width={19} height={19} available={user.available} />
  }
  else {
    // Set the group icon to a general Icon
    groupIcon = <Icon name={group} width={20} height={20} />
  }

  const ticketCount = groupTicket.length;

  return (
    <div className="GroupCard">
      <div className='group-head'>
        <div className='group-head-left'>
          {groupIcon}
          <div>{group}</div>
          <div className='count'>{ticketCount}</div>
        </div>
        <div className='group-head-right'>
          <Icon name="Plus" width={18} height={18} />
          <Icon name="ThreeDots" width={18} height={18} />
        </div>
      </div>
      {/* Map over the group's tickets and render each ticket */}
      {groupTicket.map((ticket, ticket_key) => (
        <Ticket key={ticket_key} users={users} grouping={grouping} {...ticket} />
      ))}
    </div>
  );
};

// Export the Group component
export default Group;